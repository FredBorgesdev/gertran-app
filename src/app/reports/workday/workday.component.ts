import {Component, OnInit} from '@angular/core';
import {BaseWorkdayFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {WorkdayJustificationComponent} from '../extra/workday-justification/workday-justification.component';


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

  generateReport(form: BaseWorkdayFilter): void {
    this.isLoading = true;
    const isAnalytic = this.reportFormat === 'analytic';

    const getReport = isAnalytic ?
      this.reportsService.getWorkdayHistoryAnalytical.bind(this.reportsService) :
      this.reportsService.getWorkdayHistorySynthetic.bind(this.reportsService);

    getReport(form).subscribe((workdays) => {
      this.workdayRows = isAnalytic ? workdays : this.formatSyntheticReport(workdays);
      this.isLoading = false;
    }, (err) => this.handleError(err, form));
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

  getHistoricalTableRowSpan(workday: HistoricalWorkday): number {
    if (this.isFirstDayOfWeek(workday)) {
      return this.getDaysFromWorkday(workday).length;
    }
  }

  isFirstDayOfWeek(workday: HistoricalWorkday): boolean {
    const days = this.getDaysFromWorkday(workday);

    return days[0] === workday;
  }

  private getDaysFromWorkday(workday: HistoricalWorkday): any[] {
    return this.workdayRows.filter((row) => row.week === workday.week);
  }

  private formatSyntheticReport(workdays: any[]): any[] {
    return workdays.flatMap((row) =>
      row.days.map((day) => ({
        ...day,
        ...row,
      }))
    );
  }
}
