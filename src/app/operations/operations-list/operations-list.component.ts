import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OperationsService, Operations } from '../operations.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css'],
})
export class OperationsListComponent extends BaseCrudListComponent<Operations> {
  operationsColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ];

  constructor(
    router: Router,
    service: OperationsService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'operations',
      router,
      service,
      message,
      modal,
    );
  }
}
