import {Component, OnInit} from '@angular/core';
import {BaseWorkdayFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';


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
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
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
