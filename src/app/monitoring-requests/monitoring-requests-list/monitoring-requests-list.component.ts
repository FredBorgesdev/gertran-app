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

@Component({
  selector: 'app-monitoring-requests-list',
  templateUrl: './monitoring-requests-list.component.html',
  styleUrls: ['./monitoring-requests-list.component.css'],
})
export class MonitoringRequestsListComponent extends BaseCrudListComponent<MonitoringRequests> {
  monitoringRequestsColumns = [
    { title: 'Id' },
    { title: 'Embarcador' },
    { title: 'Transportador' },
    { title: 'Motorista' },
    { title: 'Operação' },
    { title: 'Simulação' },
  ];

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

  create(): void {
    this.modal.create({
      nzTitle: 'Escolher modelo de rota',
      nzContent: RoutesModalComponent,
      nzOkText: 'Criar',
      nzCancelText: 'Cancelar',
      nzOnOk: async (componentInstance) => {
        const route = componentInstance.checkedId !== BLANK_ROUTE.id ?
          componentInstance.checkedId : null;
        const points = componentInstance.routes.find((r) => r.id === componentInstance.checkedId)?.points ?? [];

        const lngLat = points.map(({ point: { longitude, latitude } }) => ({ latitude, longitude }));
        const routeCoordinates = await this.directionsService.getDirections(lngLat);

        (this.service as MonitoringRequestsService).save({
          route,
          routeCoordinates
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
}
