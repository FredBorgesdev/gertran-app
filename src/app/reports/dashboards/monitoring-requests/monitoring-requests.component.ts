import {Component, OnInit} from '@angular/core';
import {GetAllResponse, getCurrentPage} from "../../../shared/services/api.service";
import {
  MonitoringRequests,
  MonitoringRequestsService,
  Status
} from "../../../monitoring-requests/monitoring-requests.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-monitoring-requests',
  templateUrl: './monitoring-requests.component.html',
  styleUrls: ['./monitoring-requests.component.css']
})
export class MonitoringRequestsComponent implements OnInit {
  underReviewResponse: GetAllResponse<MonitoringRequests>;
  approvedResponse: GetAllResponse<MonitoringRequests>;
  reprovedResponse: GetAllResponse<MonitoringRequests>;

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
  ) {
  }

  ngOnInit(): void {
    this.loadAllResources();
  }

  loadAllResources(): void {
    this.loadUnderReview();
    this.loadApproved();
    this.loadReproved();
  }

  loadUnderReview(url?: string): void {
    this.monitoringRequestService.getAll({
      url,
      limit: 20
    }, {
      ...this.filters,
      status: Status.UNDER_REVIEW,
    }).subscribe(response => {
      this.underReviewResponse = response;
    });
  }

  loadApproved(url?: string): void {
    this.monitoringRequestService.getAll({
      url,
      limit: 5
    }, {
      ...this.filters,
      status: Status.WAITING_FOR_START,
    }).subscribe(response => {
      this.approvedResponse = response;
    });
  }

  loadReproved(url?: string): void {
    this.monitoringRequestService.getAll({
      url,
      limit: 5
    }, {
      ...this.filters,
      status: Status.REPROVED,
    }).subscribe(response => {
      this.reprovedResponse = response;
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
    // last 24 hours
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return {
      fromDate: date.toISOString().split('T')[0],
      toDate: new Date().toISOString().split('T')[0],
    };
  }
}
