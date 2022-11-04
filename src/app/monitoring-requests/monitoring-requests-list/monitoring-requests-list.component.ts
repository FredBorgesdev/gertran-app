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

  constructor(
    private travelStepService: TravelStepService,
    private directionsService: DirectionsService,
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

  ngOnInit(): void {
    super.ngOnInit();

    this.loadWaitingForStart();
    this.loadInProgress();
    this.loadDraft();
  }

  loadWaitingForStart(url?: string): void {
    this.isLoading = true;
    this.service.getAll(
      this.pagination(url),
      {
        status: Status.WAITING_FOR_START,
        createdAt: this.oneDayBefore,
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
        createdAt: this.oneDayBefore,
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
        createdAt: this.oneDayBefore,
      }
    ).subscribe((result) => {
      this.draftResponse = result;
      this.isLoading = false;
    });
  }

  create(): void {
    this.modal.create({
      nzTitle: 'Escolher modelo de rota',
      nzContent: RoutesModalComponent,
      nzOkText: 'Criar',
      nzCancelText: 'Cancelar',
      nzOnOk: async (componentInstance) => {
        const route = componentInstance.routeId !== BLANK_ROUTE.id ?
          componentInstance.routeId : null;
        const points = componentInstance.routes.find((r) => r.id === componentInstance.routeId)?.points ?? [];

        const lngLat = points.map(({ point: { longitude, latitude } }) => ({ latitude, longitude }));
        const hasPoints = route && points.length > 0;
        const routeCoordinates = hasPoints && await this.directionsService.getCoordinates(lngLat);

        (this.service as MonitoringRequestsService).save({
          route,
          routeCoordinates,
          customer: componentInstance.customer,
        }).subscribe((result) => {
          this.createPoints(result.id, points);
          this.router.navigate(['monitoring-requests', 'monitoring-requests-edit', result.id]);
        });
      }
    });
  }

  createPoints(monitoringRequestId: string, points: Route['points']): void {
    const points$ = points.map(({ point }, index) => {
      return this.travelStepService.save({
        pointId: point.id,
        pointType: point.pointType,
        order: index + 1,
        address: point.address,
        latitude: point.latitude.toFixed(6),
        longitude: point.longitude.toFixed(6),
        city: point.city,
        state: point.state,
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'HH:mm:ss'),
      }, monitoringRequestId);
    });

    forkJoin(points$).subscribe();
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
        createdAt: this.oneDayBefore,
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

  handleQueryParamsChangeDraft(params: NzTableQueryParams): void {
    if (params.pageIndex < getCurrentPage(this.inProgressResponse)) {
      const url = this.replaceOffsetWithPage(this.draftResponse.previous, params.pageIndex);
      this.loadDraft(url);
    } else if (params.pageIndex > getCurrentPage(this.draftResponse)) {
      const url = this.replaceOffsetWithPage(this.draftResponse.next, params.pageIndex);
      this.loadDraft(url);
    }
  }

  get oneDayBefore(): string {
    const date = new Date();
    date.setDate(date.getDate() - 15);

    return date.toISOString();
  }
}
