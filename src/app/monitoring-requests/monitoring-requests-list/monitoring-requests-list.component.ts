import {Component, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MonitoringRequestsService, MonitoringRequests, Status} from '../monitoring-requests.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {BLANK_ROUTE, RoutesModalComponent} from '../routes-modal/routes-modal.component';
import {format} from 'date-fns';
import {DirectionsService} from '../../shared/services/directions.service';
import {Route} from '../../routes/routes.service';
import {GetAllResponse, getCurrentPage, Pagination} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {
  ModalDestroyResult,
  MonitoringRequestsCheckListComponent
} from '../monitoring-requests-check-list/monitoring-requests-check-list.component';
import {MonitoringRequestsFilter} from '../monitoring-requests-filter/monitoring-requests-filter.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import User from '../../users/user';
import {Observable, Subject, timer} from "rxjs";
import {takeUntil} from "rxjs/operators";
import { ReleasedByCustomersService } from '../releasedByCustomers.service';
import { BasePeriodFilter, ReportsService } from 'src/app/reports/reports.service';

@Component({
  selector: 'app-monitoring-requests-list',
  templateUrl: './monitoring-requests-list.component.html',
  styleUrls: ['./monitoring-requests-list.component.css'],
})
export class MonitoringRequestsListComponent extends BaseCrudListComponent<MonitoringRequests> implements OnInit {
  waitingForStartResponse: GetAllResponse<MonitoringRequests>;
  inProgressResponse: GetAllResponse<MonitoringRequests>;
  draftResponse: GetAllResponse<MonitoringRequests>;
  underReviewResponse: GetAllResponse<MonitoringRequests>;
  reprovedResponse: GetAllResponse<MonitoringRequests>;
  finishedResponse: GetAllResponse<MonitoringRequests>;

  field = 'plate';
  search = '';

  monitoringRequestFilters: {
    fromDate: string;
    toDate: string;
    customer?: string;
    plate?: string;
  } = {
    fromDate: this.twoDaysBefore,
    toDate: this.now,
    plate: this.search,
  };

  refreshAfterClose = new EventEmitter<ModalDestroyResult>();

  monitoringRequestRefresher: Observable<number>;
  stopTimer = new Subject();

  constructor(
    private cdr: ChangeDetectorRef,
    public reportsService: ReportsService,
    private directionsService: DirectionsService,
    private releasedByCustomersService: ReleasedByCustomersService, 
    public authService: AuthenticationService,
    service: MonitoringRequestsService,
    router: Router,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'monitoring-requests',
      router,
      service,
      message,
      modal,
    );
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();

    timer(0, 2 * 60 * 1000)
      .pipe(
        takeUntil(this.stopTimer)
      )
      .subscribe(async () => {
        await this.loadAllResources();
      });

    this.refreshAfterClose.subscribe((result) => {
      if (result?.updateList) {
        this.loadAllResources();
      }
    });
  }

  loadAllResources(loadBaseResource = false): void {
    if (loadBaseResource) {
      this.loadResources();
    }
    if (this.authService.customerId) {
      this.loadDraft();
    }
    this.loadWaitingForStart();
    this.loadInProgress();
    this.loadUnderReview();
    this.loadReproved();
    this.loadFinished();
  }

  loadWaitingForStart(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.WAITING_FOR_START,
        ...this.monitoringRequestFilters,
      }
    ).subscribe((result) => {
      
      this.waitingForStartResponse = result;
      this.isLoading = false;
    });
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()+1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  returnRange3Days() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 3);
    const fromDate = this.formatDate(sevenDaysAgo);
    const toDate = this.formatDate(currentDate);
    return { fromDate, toDate };
  }


  checkSMsIfVehicleWasReleasedIn72H(sms: GetAllResponse<MonitoringRequests>){
    for (let index = 0; index < sms.results.length; index++) {
      const element = sms.results[index];
      const customerId = element.customer.id;
    
      const {fromDate,toDate} = this.returnRange3Days()

      const periodFielter: BasePeriodFilter = {
        from:fromDate,
        to:toDate,
        customer:customerId
      }
    
      this.reportsService.getVehiclesReleased(periodFielter)
      .toPromise().then(releasedMonitoringRequests=>{
        const sm = sms.results[index];
        sm['hasRecentReleased']=(releasedMonitoringRequests
          .filter(filter=>filter.truck.id==element.truck.id && element.id != filter.id))
      })
      this.cdr.detectChanges();
    }
    return sms

  }

  loadInProgress(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.IN_PROGRESS,
        plate: this.search,
      }
    ).subscribe((result) => {
      this.inProgressResponse = result;
      this.isLoading = false;
    });
  }

  loadDraft(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.DRAFT,
        ...this.monitoringRequestFilters,
      }
    ).subscribe((result) => {
      this.draftResponse = result;
      this.isLoading = false;
    });
  }

  loadReproved(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.REPROVED,
        ...this.monitoringRequestFilters,
      }
    ).subscribe((result) => {
      this.reprovedResponse = result;
      this.isLoading = false;
    });
  }

  loadFinished(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.FINISHED,
        ...this.monitoringRequestFilters,
      }
    ).subscribe((result) => {
      this.finishedResponse = result;
      this.isLoading = false;
    });
  }

  loadUnderReview(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.UNDER_REVIEW,
        ...this.monitoringRequestFilters,
      }
    ).subscribe((result) => {
      this.underReviewResponse = result;
      this.isLoading = false;
    });
  }

  create(): void {
    this.modal.create({
      nzTitle: 'Escolher modelo de rota',
      nzContent: RoutesModalComponent,
      nzOkText: 'Criar',
      nzWidth: '80%',
      nzCancelText: 'Cancelar',
      nzOnOk: async (componentInstance) => {
        const route = componentInstance.routeId !== BLANK_ROUTE.id ?
          componentInstance.routeId : null;
        const points = this.getPoints(componentInstance.route?.points ?? []);
        const hasPoints = route && points.length > 0;
        const routeCoordinates = hasPoints && await this.directionsService.getCoordinates(points);
        const transporterId = this.authService.customerId || componentInstance.customer;

        (this.service as MonitoringRequestsService).save({
          route,
          routeCoordinates,
          customer: componentInstance.customer,
          travelSteps: points,
          transporter: transporterId as any,
        }).subscribe((result) => {
          this.router.navigate(['monitoring-requests', 'monitoring-requests-edit', result.id]);
        });
      }
    });
  }

  getPoints(points: Route['points']): any {
    return points.map(({point}, index) => ({
      point: point.id,
      pointType: point.pointType,
      order: index + 1,
      address: point.address,
      latitude: point.latitude.toFixed(6),
      longitude: point.longitude.toFixed(6),
      city: point.city,
      state: point.state,
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm:ss'),
    }));
  }

  pagination(url?: string): Pagination {
    return {
      ...super.pagination(url),
      limit: 10
    };
  }

  additionalParams(): any[] {
    return [
      {
        status: Status.CANCELED,
        ...this.monitoringRequestFilters,
      }
    ];
  }

  view(item: MonitoringRequests): void {
    this.modal.create({
      nzTitle: item.name,
      nzContent: MonitoringRequestsCheckListComponent,
      nzComponentParams: {
        monitoringRequestId: item.id,
        readOnly: item.status !== Status.UNDER_REVIEW,
        showFooter: true,
      },
      nzWidth: '90%',
      nzOkText: null,
      nzCancelText: null,
      nzAfterClose: this.refreshAfterClose
    });
  }

  handleQueryParamsChangeWaitingForStart(params: NzTableQueryParams): void {
    if (params.pageIndex < getCurrentPage(this.waitingForStartResponse)) {
      const url = this.replaceOffsetWithPage(this.waitingForStartResponse.previous, params.pageIndex);
      this.loadWaitingForStart(url);
    } else if (params.pageIndex > getCurrentPage(this.waitingForStartResponse)) {
      const url = this.replaceOffsetWithPage(this.waitingForStartResponse.next, params.pageIndex);
      this.loadWaitingForStart(url);
    }
  }

  handleQueryParamsChangeInProgress(params: NzTableQueryParams): void {
    if (params.pageIndex < getCurrentPage(this.inProgressResponse)) {
      const url = this.replaceOffsetWithPage(this.inProgressResponse.previous, params.pageIndex);
      this.loadInProgress(url);
    } else if (params.pageIndex > getCurrentPage(this.inProgressResponse)) {
      const url = this.replaceOffsetWithPage(this.inProgressResponse.next, params.pageIndex);
      this.loadInProgress(url);
    }
  }

  handleQueryParamsChangeUnderReview(params: NzTableQueryParams): void {
    if (params.pageIndex < getCurrentPage(this.underReviewResponse)) {
      const url = this.replaceOffsetWithPage(this.underReviewResponse.previous, params.pageIndex);
      this.loadUnderReview(url);
    } else if (params.pageIndex > getCurrentPage(this.underReviewResponse)) {
      const url = this.replaceOffsetWithPage(this.underReviewResponse.next, params.pageIndex);
      this.loadUnderReview(url);
    }
  }

  handleQueryParamsChangeDraft(params: NzTableQueryParams): void {
    if (params.pageIndex < getCurrentPage(this.inProgressResponse)) {
      const url = this.replaceOffsetWithPage(this.draftResponse.previous, params.pageIndex);
      this.loadDraft(url);
    } else if (params.pageIndex > getCurrentPage(this.draftResponse)) {
      const url = this.replaceOffsetWithPage(this.draftResponse.next, params.pageIndex);
      this.loadDraft(url);
    }
  }

  handleQueryParamsChangeReproved(params: NzTableQueryParams): void {
    if (params.pageIndex < getCurrentPage(this.reprovedResponse)) {
      const url = this.replaceOffsetWithPage(this.reprovedResponse.previous, params.pageIndex);
      this.loadReproved(url);
    } else if (params.pageIndex > getCurrentPage(this.reprovedResponse)) {
      const url = this.replaceOffsetWithPage(this.reprovedResponse.next, params.pageIndex);
      this.loadReproved(url);
    }
  }

  handleQueryParamsChangeFinished(params: NzTableQueryParams): void {
    if (params.pageIndex < getCurrentPage(this.finishedResponse)) {
      const url = this.replaceOffsetWithPage(this.finishedResponse.previous, params.pageIndex);
      this.loadFinished(url);
    } else if (params.pageIndex > getCurrentPage(this.finishedResponse)) {
      const url = this.replaceOffsetWithPage(this.finishedResponse.next, params.pageIndex);
      this.loadFinished(url);
    }
  }

  get twoDaysBefore(): string {
    const date = new Date();
    date.setDate(date.getDate() - 2);

    return date.toISOString();
  }

  get now(): string {
    return new Date().toISOString();
  }

  filterData(form: MonitoringRequestsFilter): void {
    this.monitoringRequestFilters = {
      fromDate: new Date(form.from).toISOString(),
      toDate: new Date(form.to).toISOString(),
      customer: form.customer,
    };

    this.loadAllResources(true);
  }

  get user(): User {
    return this.authService.user;
  }

  filterByPlate(): void {
    this.monitoringRequestFilters = {
      ...this.monitoringRequestFilters,
      plate: this.search,
    };
    this.searchSubject.next(this.search);
  }

  protected performSearch(value: string): void {
    this.loadAllResources(true);
  }
}
