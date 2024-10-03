import {Component, OnInit} from '@angular/core';
import {BaseWorkdayFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {WorkdayJustificationComponent} from '../extra/workday-justification/workday-justification.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 


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

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
  }

  formatDateToBrazilian(date) {
    return date.toLocaleDateString('pt-BR');
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

    getReport(form).subscribe((workdays) => {

      // this.workdayRows = workdays
      this.workdayRows = isAnalytic ? workdays : this.formatSyntheticReport(workdays);
      this.isLoading = false;
    }, (err) => this.handleError(err, form));
  }

  generatePDF(event): void {
   this.synteticReport(event)
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
      const dateRecords = row.records.map(record => {
        return [
          this.formatDateToBrazilian(new Date(record.startedAt)), 
          record.status,
          record.position_event ? record.position_event : 'Registrado pelo Sistema'
        ];
      });
    
      return dateRecords;
    }).flat();

    
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
    this.reportFormat = params.reportFormat;
  }

  formatSyntheticReport(workdays: any[]): any[] {
    workdays = workdays.map((workday) => ({
      ...workday,
      workdayHours: this.adjustHours(workday.workdayHours),
      drivingHours: this.adjustHours(workday.drivingHours),
      restHours: this.adjustHours(workday.restHours),
      lunchHours: this.adjustHours(workday.lunchHours),
      waitingHours: this.adjustHours(workday.waitingHours),
      extraHours: this.adjustHours(workday.extraHours),
      nightShiftHours: this.adjustHours(workday.nightShiftHours),
    }));
    return workdays
  }
}
