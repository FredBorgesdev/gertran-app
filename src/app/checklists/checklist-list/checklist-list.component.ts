import { Component, OnInit } from '@angular/core';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Router} from '@angular/router';
import {Checklist, ChecklistsService} from '../checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-checklists-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css']
})
export class ChecklistListComponent extends BaseCrudListComponent<Checklist> {
  checklistColumns = [
    { title: 'Data criação' },
    { title: 'Placa' },
    { title: 'Cliente' },
    { title: 'Ações' }
  ];

  constructor(
    router: Router,
    service: ChecklistsService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'checklists',
      router,
      service,
      message,
      modal
    );
  }

  edit(resource: Checklist): void {
    this.router.navigate(['checklists', 'checklists-review', resource.id]);
  }
}
