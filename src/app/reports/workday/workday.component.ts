import {Component, OnInit} from '@angular/core';
import {BaseWorkdayFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {WorkdayJustificationComponent} from '../extra/workday-justification/workday-justification.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { WorkdayService, Workday as WorkdayPolicy } from '../../workdays/workday.service';
import { AuthenticationService } from '../../authentication/authentication.service';


export interface Day {
  date: string;
  day: string;
  workdayHours: string;
  drivingHours: string;
  restHours: string;
  lunchHours: string;
  waitingHours: string;
  extraHours: string;
  nightShiftHours: string;
}

export interface HistoricalWorkday {
  week: number;
  evaluatedDays: number;
  workingDays: number;
  nonWorkingDays: number;
  weeklyWorkingHours: string;
  weeklyExtraHours: string;
  days: Day[];
}


@Component({
  selector: 'app-workday',
  templateUrl: './workday.component.html',
  styleUrls: ['./workday.component.css']
})
export class WorkdayComponent implements OnInit {
  isLoading = false;
  workdayRows: any[] = [];
  reportFormat = 'synthetic';
  summary: { violations: number; days: number; weeklyViolations: number } = { violations: 0, days: 0, weeklyViolations: 0 };
  private policy: WorkdayPolicy | null = null;
  private customerId: string | null = null;

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
    private modal: NzModalService,
    private workdayService: WorkdayService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.customerId = (this.authService as any)?.customerId ?? null;
  }

  formatDateToBrazilian(date) {
    return date.toLocaleDateString('pt-BR');
  }

  formatTimeToBrazilian(date) {
    return date.toLocaleString('pt-BR');
  }

  adjustHours(hoursString: string): string {
    const parts = hoursString.split(' ');
    
    let totalSeconds = 0;
  
    if (parts.length === 2) {
      const days = parseInt(parts[0], 10);
      const timeParts = parts[1].split(':'); 
  
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
  
      totalSeconds += days * 24 * 3600;
      totalSeconds += hours * 3600; 
      totalSeconds += minutes * 60; 
      totalSeconds += seconds; 
    } else if (parts.length === 1) {
      const timeParts = parts[0].split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
  
      totalSeconds += hours * 3600;
      totalSeconds += minutes * 60;
      totalSeconds += seconds;
    }
  
    const adjustedHours = Math.floor(totalSeconds / 3600);
    const adjustedMinutes = Math.floor((totalSeconds % 3600) / 60);
    const adjustedSeconds = totalSeconds % 60;
  
    return `${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}:${String(adjustedSeconds).padStart(2, '0')}`;
  }
  
  groupByDate(workdays: any[]): { date: string; records: any[] }[] {
    const grouped: { [key: string]: any[] } = {};
  
    workdays.forEach((workday) => {
      const date = new Date(workday.startedAt).toLocaleDateString('pt-BR');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(workday);
    });
  
    return Object.keys(grouped).map((date) => ({ date, records: grouped[date] }));
  }
  
  generateReport(form: BaseWorkdayFilter): void {
    this.isLoading = true;
    const isAnalytic = this.reportFormat === 'analytic';

    const getReport = isAnalytic ?
      this.reportsService.getWorkdayHistoryAnalytical.bind(this.reportsService) :
      this.reportsService.getWorkdayHistorySynthetic.bind(this.reportsService);

    const customerForPolicy = form?.customer || this.customerId;
    const loadPolicy$ = customerForPolicy ? this.workdayService.getAll({ limit: 1 }, customerForPolicy) : null;

    const applyAndFinish = (workdays: any[]) => {
      const rows = isAnalytic ? workdays : this.formatSyntheticReport(workdays);
      this.workdayRows = isAnalytic || !this.policy ? rows : this.applyPolicy(rows, this.policy);
      this.summary = this.buildSummary(this.workdayRows);
      this.isLoading = false;
    };

    if (loadPolicy$) {
      loadPolicy$.subscribe((resp: any) => {
        const items = resp?.results || resp?.data || [];
        this.policy = Array.isArray(items) && items.length > 0 ? items[0] : null;
        getReport(form).subscribe(applyAndFinish, (err) => this.handleError(err, form));
      }, _ => {
        this.policy = null;
        getReport(form).subscribe(applyAndFinish, (err) => this.handleError(err, form));
      });
    } else {
      // Sem cliente definido
      this.policy = null;
      getReport(form).subscribe(applyAndFinish, (err) => this.handleError(err, form));
    }
  }

  generatePDF(event): void {
    try {
      this.reportFormat === 'analytic' ? this.alaliticalReport(event) : this.synteticReport(event);
    } catch (error) {
      console.log(error)
    }
  }


  alaliticalReport(event): void{
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const headerStartY = 10;
    const logoWidth = 50;
    const logoHeight = 20;
    const divWidth = pageWidth - logoWidth - 20; 

    const header = (data) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(10, headerStartY, divWidth, 20, 'F');

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold'); 

      doc.setTextColor(0, 0, 0); 
      doc.text(`Relatório Jornada de ${event.name}`, 50, headerStartY + 12);

      doc.setFont('helvetica', 'normal'); 
      doc.setFontSize(12);
      doc.text(`Periodo de ${event.from} à ${event.to}`, 50, headerStartY + 17);

      const logoUrl = 'assets/images/logo/logogertran.png';
      doc.addImage(logoUrl, 'PNG', 260, headerStartY, logoWidth-25, logoHeight);
      doc.setLineWidth(0.5);
      doc.line(10, headerStartY + 25, pageWidth - 10, headerStartY + 25); 
    };

    const headers = [
      ['Data Hora','Status', 'Origem'],
    ];


    const groupedData = this.workdayRows.map(row => {
      return [
          this.formatTimeToBrazilian(new Date(row.startedAt)), 
          row.status,
          row.positionEvent ? row.positionEvent.eventDescription : 'Registrado pelo Sistema'
      ]
    })

    autoTable(doc, {
      head: headers,
      body: groupedData,
      startY: headerStartY + 30,
      theme: 'striped',
      styles: {
        fontSize: 7,
        fontStyle: 'bold',
        lineWidth: 0.5
      },
      margin: { top: headerStartY + 30 },
      willDrawCell: (data) => {
        if (data.row.index === groupedData.length - 30) {
          const remainingSpace = pageHeight - data.cell.y - data.cell.height;
          if (remainingSpace < data.cell.height + 10) {
            doc.addPage();
          }
        }
      },
      didDrawPage: (data) => {
        header(data);
        const pageCount = doc.getNumberOfPages()
        const str = `Página ${pageCount}`; 
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.right, doc.internal.pageSize.getHeight() - 10);
      },   
    });
    doc.save('relatorio-jornada.pdf');
  }

  synteticReport(event):void{
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const headerStartY = 10;
    const logoWidth = 50;
    const logoHeight = 20;
    const divWidth = pageWidth - logoWidth - 20; 


    const header = (data) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(10, headerStartY, divWidth, 20, 'F');

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold'); 

      doc.setTextColor(0, 0, 0); 
      doc.text(`Relatório Jornada de ${event.name}`, 50, headerStartY + 12);

      doc.setFont('helvetica', 'normal'); 
      doc.setFontSize(12);
      doc.text(`Periodo de ${event.from} à ${event.to}`, 50, headerStartY + 17);

      const logoUrl = 'assets/images/logo/logogertran.png';
      doc.addImage(logoUrl, 'PNG', 260, headerStartY, logoWidth-25, logoHeight);
      doc.setLineWidth(0.5);
      doc.line(10, headerStartY + 25, pageWidth - 10, headerStartY + 25); 
    };

    const formatHours = (hoursStr: string): string => {
      const truncated = hoursStr.substring(0, 8);
      const [hoursPart = '00', minutesPart = '00', secondsPart = '00'] = truncated.split(':');
      const hours = hoursPart.padStart(2, '0');
      const minutes = minutesPart.padStart(2, '0');
      const seconds = secondsPart.padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    function convertToDecimal(hoursStr: string): number {
      const [hours, minutes, seconds] = hoursStr.split(':').map(Number);
      return hours + minutes / 60 + seconds / 3600;
    }
    
    function convertToTimeString(decimalHours: number): string {
      const hours = Math.floor(decimalHours);
      const minutes = Math.floor((decimalHours - hours) * 60);
      const seconds = Math.floor(((decimalHours - hours) * 60 - minutes) * 60);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function formatDateTime(dateTime: string): string {
      if(dateTime == null)
        return ''
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      };
      return new Date(dateTime).toLocaleString('pt-BR', options);
    }

    const headers = [
      ['Data','Entrada' ,'Saida', 'Jornada', 'Direção', 'Refeição', 'Espera', 'Descanso', 'Hora extra', 'Ad. noturno'],
    ];

    const totals = {
      workdayHours: 0,
      drivingHours: 0,
      lunchHours: 0,
      waitingHours: 0,
      restHours: 0,
      extraHours: 0,
      nightShiftHours: 0,
    };

    this.workdayRows.forEach(row => {
      totals.workdayHours += convertToDecimal(row.workdayHours);
      totals.drivingHours += convertToDecimal(row.drivingHours);
      totals.lunchHours += convertToDecimal(row.lunchHours);
      totals.waitingHours += convertToDecimal(row.waitingHours);
      totals.restHours += convertToDecimal(row.restHours);
      totals.extraHours += convertToDecimal(row.extraHours);
      totals.nightShiftHours += convertToDecimal(row.nightShiftHours);
    });


    const data = this.workdayRows.map(row => {
      const exampleDate = new Date(row.date + 'T00:00:00');
      const formattedDate = this.formatDateToBrazilian(exampleDate);
      return [
        formattedDate, formatDateTime(row.workdayTime), formatDateTime(row.endOfWorkday),
        formatHours(row.workdayHours), formatHours(row.drivingHours), formatHours(row.lunchHours),
        formatHours(row.waitingHours), formatHours(row.restHours), formatHours(row.extraHours), formatHours(row.nightShiftHours)
      ]
    });

    data.push([
      'Totais', '', '', convertToTimeString(totals.workdayHours),
      convertToTimeString(totals.drivingHours), convertToTimeString(totals.lunchHours),
      convertToTimeString(totals.waitingHours), convertToTimeString(totals.restHours),
      convertToTimeString(totals.extraHours), convertToTimeString(totals.nightShiftHours)
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: headerStartY + 30,
      theme: 'striped',
      styles: {
        fontSize: 7,
        fontStyle: 'bold',
        lineWidth: 0.5
      },
      margin: { top: headerStartY + 30 },
      didDrawPage: (data) => {
        header(data);
        const pageCount = doc.getNumberOfPages()
        const str = `Página ${pageCount}`; 
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.right, doc.internal.pageSize.getHeight() - 10);
      },   
    });

    const totalPages = doc.getNumberOfPages();
    doc.setPage(totalPages); 
    doc.setFontSize(12);
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    doc.text(`Data da emissão: ${formattedDate} - ${event.name}: ____________________________________`, 14, pageHeight - 20);
    doc.save('relatorio-jornada.pdf');
  }

  formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  handleError(err: any, form: BaseWorkdayFilter): void {
    this.isLoading = false;
    this.message.error('Ocorreu um erro ao gerar o relatório');

    if (err?.error?.extra?.fields?.days_without_events) {
      const daysWithoutEvents = err.error.extra.fields.days_without_events;
      this.modal.create({
        nzTitle: 'Dias sem eventos',
        nzContent: WorkdayJustificationComponent,
        nzWidth: 800,
        nzComponentParams: {
          daysWithoutEvents,
          form,
        },
      });

      return;
    }
  }

  valueChanges(params: BaseWorkdayFilter): void {
    this.workdayRows = []
    this.reportFormat = params.reportFormat;
  }

  formatSyntheticReport(workdays: any[]): any[] {
    const _workdays = workdays.map((workday) => ({
      ...workday,
      workdayHours: this.adjustHours(workday.workdayHours),
      drivingHours: this.adjustHours(workday.drivingHours),
      restHours: this.adjustHours(workday.restHours),
      lunchHours: this.adjustHours(workday.lunchHours),
      waitingHours: this.adjustHours(workday.waitingHours),
      extraHours: this.adjustHours(workday.extraHours),
      nightShiftHours: this.adjustHours(workday.nightShiftHours),
    }));
    return _workdays
  }

  // ======= Validações legais da jornada =======
  private applyPolicy(rows: any[], policy: WorkdayPolicy) {
    // No backend, os valores de WorkdaySettings são tratados como MINUTOS (ex.: maximum_workday_period)
    const toMsMin = (m: number) => (m || 0) * 60_000;

    const weekTotals: Record<string, number> = {};

    // Pré-processar semana
    rows.forEach(r => {
      const weekKey = this.simpleWeekKey(new Date(r.date));
      r.weekKey = weekKey;
      weekTotals[weekKey] = (weekTotals[weekKey] || 0) + this.parseDurationMs(r.workdayHours);
    });

    return rows.map(r => {
      const violations: string[] = [];
      const workMs  = this.parseDurationMs(r.workdayHours);
      const driveMs = this.parseDurationMs(r.drivingHours);
      const restMs  = this.parseDurationMs(r.restHours);
      const lunchMs = this.parseDurationMs(r.lunchHours);

      // Limites diários
      if (policy.maximumWorkdayPeriod && workMs > toMsMin(policy.maximumWorkdayPeriod)) {
        violations.push(`Jornada diária acima do limite`);
      }
      if (policy.maximumHoursDailyDriving && driveMs > toMsMin(policy.maximumHoursDailyDriving)) {
        violations.push(`Direção diária acima do limite`);
      }

      // Direção contínua e pausa exigida (se disponível no dado)
      const contDriveMs = r.continuousDrivingMs ?? null;
      const breakMs = r.breakAfterContinuousDrivingMs ?? null;
      if (contDriveMs != null && policy.maximumHoursContinuousDriving && contDriveMs > toMsMin(policy.maximumHoursContinuousDriving)) {
        violations.push(`Direção contínua acima do limite`);
      }
      if (
        contDriveMs != null && policy.maximumHoursContinuousDriving && contDriveMs > toMsMin(policy.maximumHoursContinuousDriving) &&
        policy.restPeriodToBreakContinuousDriving && (breakMs == null || breakMs < toMsMin(policy.restPeriodToBreakContinuousDriving))
      ) {
        violations.push(`Pausa após direção contínua inferior ao mínimo`);
      }

      // Descanso contínuo min/máx (se disponível)
      const contRestMs = r.continuousRestMs ?? null;
      if (contRestMs != null && policy.minimumContinuousRestPeriod && contRestMs < toMsMin(policy.minimumContinuousRestPeriod)) {
        violations.push(`Descanso contínuo menor que o mínimo`);
      }
      if (contRestMs != null && policy.maximumContinuousRestPeriod && contRestMs > toMsMin(policy.maximumContinuousRestPeriod)) {
        violations.push(`Descanso contínuo maior que o máximo`);
      }

      // Refeição mínima
      if (policy.minimumLunchRestPeriod && lunchMs < toMsMin(policy.minimumLunchRestPeriod)) {
        violations.push(`Refeição menor que o mínimo`);
      }

      // Descanso entre jornadas (se houver dados do dia anterior)
      const restBetweenShiftsMs = r.restBetweenShiftsMs ?? null;
      if (restBetweenShiftsMs != null && policy.restPeriodBetweenWorkingDays && restBetweenShiftsMs < toMsMin(policy.restPeriodBetweenWorkingDays)) {
        violations.push(`Descanso entre jornadas menor que o mínimo`);
      }

      // Semanal
      const weekTotalMs = weekTotals[r.weekKey] || 0;
      if (policy.maximumHoursPerWeek && weekTotalMs > toMsMin(policy.maximumHoursPerWeek)) {
        violations.push('Jornada semanal acima do limite');
      }

      return { ...r, violations, violationCount: violations.length };
    });
  }

  private buildSummary(rows: any[]) {
    const violations = rows.reduce((acc, r) => acc + (r.violationCount || 0), 0);
    const weeklyViolations = rows.filter(r => Array.isArray(r.violations) && r.violations.includes('Jornada semanal acima do limite')).length;
    return { violations, days: rows.length, weeklyViolations };
  }

  private parseDurationMs(value: string | number | null | undefined): number {
    if (value == null) return 0;
    if (typeof value === 'number') return value;
    const parts = String(value).split(' ');
    let totalSeconds = 0;
    if (parts.length === 2) {
      const days = parseInt(parts[0], 10) || 0;
      const [hh='0', mm='0', ss='0'] = parts[1].split(':');
      totalSeconds += days * 24 * 3600;
      totalSeconds += (parseInt(hh, 10) || 0) * 3600;
      totalSeconds += (parseInt(mm, 10) || 0) * 60;
      totalSeconds += (parseInt(ss, 10) || 0);
    } else {
      const [hh='0', mm='0', ss='0'] = String(value).split(':');
      totalSeconds += (parseInt(hh, 10) || 0) * 3600;
      totalSeconds += (parseInt(mm, 10) || 0) * 60;
      totalSeconds += (parseInt(ss, 10) || 0);
    }
    return totalSeconds * 1000;
  }

  private simpleWeekKey(d: Date): string {
    const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = (tmp.getUTCDay() + 6) % 7;
    tmp.setUTCDate(tmp.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 4));
    const week = 1 + Math.round(((tmp.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
    return `${tmp.getUTCFullYear()}-${String(week).padStart(2, '0')}`;
  }
}
