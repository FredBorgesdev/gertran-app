import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MonitoringRequestsService, MonitoringRequests } from '../monitoring-requests.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';
import {BLANK_ROUTE, RoutesModalComponent} from '../routes-modal/routes-modal.component';

@Component({
  selector: 'app-monitoring-requests-list',
  templateUrl: './monitoring-requests-list.component.html',
  styleUrls: ['./monitoring-requests-list.component.css'],
})
export class MonitoringRequestsListComponent extends BaseCrudListComponent<MonitoringRequests> {
  monitoringRequestsColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ];

  constructor(
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
        if (componentInstance.checkedId === BLANK_ROUTE.id) {
          return;
        }

        (this.service as MonitoringRequestsService).save({
          route: componentInstance.checkedId as string
        }).subscribe((result) => {
          this.router.navigate(['monitoring-requests', 'monitoring-requests-edit', result.id]);
        });
      }
    });
  }
}
