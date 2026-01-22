import { Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import { GetAllResponse, getCurrentPage } from '../../../shared/services/api.service';
import {
  MonitoringRequests,
  MonitoringRequestsService,
  Status
} from '../../../monitoring-requests/monitoring-requests.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subject, timer, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { format } from 'date-fns';

@Component({
  selector: 'app-monitoring-requests',
  templateUrl: './monitoring-requests.component.html',
  styleUrls: ['./monitoring-requests.component.css']
})
export class MonitoringRequestsComponent implements OnInit, OnDestroy {
  @Input() hideHeader = false;

  underReviewResponse: GetAllResponse<MonitoringRequests>;
  inProgressResponse: GetAllResponse<MonitoringRequests>;
  reprovedResponse: GetAllResponse<MonitoringRequests>;
  combinedResponse: GetAllResponse<MonitoringRequests> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    limit: 10,
    offset: 0
  };

  stopTimer = new Subject();
  nextUpdate = 300;
  isFullScreen = false;

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
  ) {
  }

  ngOnInit(): void {
    timer(0, 5 * 60 * 1000).pipe(
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
    this.nextUpdate = 300;

    this.loadAllStatuses();
  }

  loadAllStatuses(): void {
    const limit = 50;

    forkJoin({
      underReview: this.monitoringRequestService.getAll({
        limit
      }, {
        ...this.filters,
        status: Status.UNDER_REVIEW,
      }),
      inProgress: this.monitoringRequestService.getAll({
        limit
      }, {
        ...this.filters,
        status: Status.IN_PROGRESS,
      }),
      reproved: this.monitoringRequestService.getAll({
        limit
      }, {
        ...this.filters,
        status: Status.REPROVED,
      })
    }).subscribe(responses => {
      this.underReviewResponse = responses.underReview;
      this.inProgressResponse = responses.inProgress;
      this.reprovedResponse = responses.reproved;

      const allResults = [
        ...(responses.underReview.results || []),
        ...(responses.inProgress.results || []),
        ...(responses.reproved.results || [])
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      this.combinedResponse = {
        count: allResults.length,
        next: null,
        previous: null,
        results: allResults,
        limit: 10,
        offset: 0
      };
    });
  }

  loadUnderReview(url?: string): void {
    this.monitoringRequestService.getAll({
      url,
      limit: 10
    }, {
      ...this.filters,
      status: Status.UNDER_REVIEW,
    }).subscribe(response => {
      this.underReviewResponse = response;
    });
  }

  handleQueryParamsChange(
    params: NzTableQueryParams,
    callbackFn: (url?: string) => void,
  ): void {
    if (params.pageIndex < getCurrentPage(this.underReviewResponse)) {
      const url = this.replaceOffsetWithPage(this.underReviewResponse.previous, params.pageIndex);
      callbackFn(url);
    } else if (params.pageIndex > getCurrentPage(this.underReviewResponse)) {
      const url = this.replaceOffsetWithPage(this.underReviewResponse.next, params.pageIndex);
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
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return {
      fromDate: yesterday.toISOString().split('T')[0],
      toDate: today.toISOString().split('T')[0],
    };
  }

  get currentTime(): string {
    return format(new Date(), 'HH:mm:ss');
  }

  formatSeconds(nextUpdate: number): string {
    return `00:00:${nextUpdate.toString().padStart(2, '0')}`;
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  openFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  closeFullscreen() {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenModes(event: any) {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }
}
