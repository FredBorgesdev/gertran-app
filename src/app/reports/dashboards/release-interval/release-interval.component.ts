import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GetAllResponse, getCurrentPage} from '../../../shared/services/api.service';
import {
  MonitoringRequests,
  MonitoringRequestsService,
  Status
} from '../../../monitoring-requests/monitoring-requests.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {differenceInMinutes, format} from 'date-fns';

@Component({
  selector: 'app-release-interval',
  templateUrl: './release-interval.component.html',
  styleUrls: ['./release-interval.component.css']
})
export class ReleaseIntervalComponent implements OnInit, OnDestroy {
  @Input() hideHeader = false;

  monitoringRequestResponse: GetAllResponse<MonitoringRequests>;

  stopTimer = new Subject();
  nextUpdate = 60;

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
  ) {
  }

  ngOnInit(): void {
    timer(0, 1 * 60 * 1000).pipe(
      takeUntil(this.stopTimer)
    ).subscribe(
      () => this.loadAllResources()
    );

    timer(0, 1 * 1000).pipe(
      takeUntil(this.stopTimer)
    ).subscribe(
      () => {
        this.nextUpdate -= 1;
      }
    );
  }

  ngOnDestroy(): void {
    this.stopTimer.next();
  }

  loadAllResources(): void {
    this.nextUpdate = 60;

    this.loadMonitoringRequests();
  }

  loadMonitoringRequests(url?: string): void {
    this.monitoringRequestService.getAll({
      url,
      limit: 20
    }, {
      ...this.filters,
      status: Status.WAITING_FOR_START,
    }).subscribe(response => {
      this.monitoringRequestResponse = response;
    });
  }

  handleQueryParamsChange(
    params: NzTableQueryParams,
    callbackFn: (url?: string) => void,
  ): void {
    if (params.pageIndex < getCurrentPage(this.monitoringRequestResponse)) {
      const url = this.replaceOffsetWithPage(this.monitoringRequestResponse.previous, params.pageIndex);
      callbackFn(url);
    } else if (params.pageIndex > getCurrentPage(this.monitoringRequestResponse)) {
      const url = this.replaceOffsetWithPage(this.monitoringRequestResponse.next, params.pageIndex);
      callbackFn(url);
    }
  }

  replaceOffsetWithPage(url: string, page: number): string {
    const limit = +url.match(/limit=\d+/)[0].split('=')[1];

    return url.replace(/offset=\d+/, `offset=${(limit * page) - limit}`);
  }

  get filters(): {
    fromDate: string,
    toDate: string,
  } {
    // last 24 hours
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return {
      fromDate: date.toISOString().split('T')[0],
      toDate: new Date().toISOString().split('T')[0],
    };
  }

  get currentTime(): string {
    return format(new Date(), 'HH:mm:ss');
  }

  formatSeconds(nextUpdate: number): string {
    return `00:00:${nextUpdate.toString().padStart(2, '0')}`;
  }

  getRowClass(item: MonitoringRequests): string {
    const createdInMinutes = this.getUpdateDiff(item);

    if (createdInMinutes >= 15) {
      return 'bg-danger';
    }

    if (createdInMinutes >= 10) {
      return 'bg-alert';
    }
  }

  getUpdateDiff(row: MonitoringRequests): number {
    return differenceInMinutes(
      new Date(row.releasedAt),
      new Date(row.publishedAt),
    );
  }
}
