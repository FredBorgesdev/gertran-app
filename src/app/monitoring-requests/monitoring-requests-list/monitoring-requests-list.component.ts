import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MonitoringRequestsService, MonitoringRequests } from '../monitoring-requests.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';
import {BLANK_ROUTE, RoutesModalComponent} from '../routes-modal/routes-modal.component';
import {TravelStepService} from '../travel-step.service';
import {forkJoin} from 'rxjs';

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
      nzOnOk: (componentInstance) => {
        const route = componentInstance.checkedId !== BLANK_ROUTE.id ?
          componentInstance.checkedId : null;
        const points = componentInstance.routes.find((r) => r.id === componentInstance.checkedId)?.points ?? [];

        (this.service as MonitoringRequestsService).save({
          route
        }).subscribe((result) => {
          this.createPoints(result.id, points);
          this.router.navigate(['monitoring-requests', 'monitoring-requests-edit', result.id]);
        });
      }
    });
  }

  createPoints(monitoringRequestId: string, points: any[]): void {
    const points$ = points.map((point) => {
    });

    forkJoin(points$).subscribe();
  }
}
