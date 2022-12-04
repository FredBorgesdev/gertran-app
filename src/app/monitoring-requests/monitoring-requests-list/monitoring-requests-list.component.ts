import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MonitoringRequestsService, MonitoringRequests } from '../monitoring-requests.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';
import {BLANK_ROUTE, RoutesModalComponent} from '../routes-modal/routes-modal.component';
import {TravelStepService} from '../travel-step.service';
import {forkJoin} from 'rxjs';
import {format} from 'date-fns';
import {DirectionsService} from '../../shared/services/directions.service';
import {Route} from '../../routes/routes.service';
import {GetAllResponse, getCurrentPage, Pagination} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {MonitoringRequestsCheckListComponent} from '../monitoring-requests-check-list/monitoring-requests-check-list.component';
import {MonitoringRequestsFilter} from '../monitoring-requests-filter/monitoring-requests-filter.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import User from '../../users/user';
import {state} from '@angular/animations';

enum Status {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  WAITING_FOR_START = 'waiting_for_start',
  IN_PROGRESS = 'in_progress',
  REPROVED = 'reproved',
  FINISHED = 'finished',
  SUCCESSFULLY_TERMINATED = 'successfully_terminated',
  CANCELED = 'canceled',
  UNSUCCESSFULLY_TERMINATED = 'unsuccessfully_terminated',
  TERMINATED_DISAPPROVED = 'terminated_disapproved',
  POTENTIALLY_STOLEN = 'potentially_stolen',
  STOLEN_CONFIRMED = 'stolen_confirmed',
  PENDING = 'pending',
  IMPORTED_UNAVAILABLE = 'imported_unavailable',
}

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

  monitoringRequestFilters: {
    fromDate: string;
    toDate: string;
    customer?: string;
  } = {
    fromDate: this.twoDaysBefore,
    toDate: this.now,
  };

  constructor(
    private travelStepService: TravelStepService,
    private directionsService: DirectionsService,
    private authService: AuthenticationService,
    router: Router,
    service: MonitoringRequestsService,
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

    await this.loadAllResources();
  }

  loadAllResources(loadBaseResource = false): void {
    if (loadBaseResource) {
      this.loadResources();
    }
    if (!this.user.isGertranStaff) {
      this.loadDraft();
    }
    this.loadWaitingForStart();
    this.loadInProgress();
    this.loadUnderReview();
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

  loadInProgress(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.IN_PROGRESS,
        ...this.monitoringRequestFilters,
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
        const shipperId = this.authService.customerId;

        (this.service as MonitoringRequestsService).save({
          route,
          routeCoordinates,
          customer: componentInstance.customer,
          travelSteps: points,
          shipper: shipperId as any,
        }).subscribe((result) => {
          this.router.navigate(['monitoring-requests', 'monitoring-requests-edit', result.id]);
        });
      }
    });
  }

  getPoints(points: Route['points']): any {
    return points.map(({ point }, index) => ({
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
      nzComponentParams: {monitoringRequestId: item.id},
      nzWidth: '90%',
      nzOkText: 'Salvar',
      nzOnOk: (componentInstance) => componentInstance.save(),
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
}
