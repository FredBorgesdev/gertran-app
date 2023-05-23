import {Component, OnInit} from '@angular/core';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Router} from '@angular/router';
import {Checklist, ChecklistsService} from '../checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-checklists-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css']
})
export class ChecklistListComponent extends BaseCrudListComponent<Checklist> {
  checklistColumns = [
    {title: 'Data criação'},
    {title: 'Placa'},
    {title: 'Tecnologia'},
    {title: 'Cliente'},
    {title: 'Motorista'},
    {title: 'Origem'},
    {title: 'Destino'},
    {title: 'Ações'}
  ];

  constructor(
    router: Router,
    service: ChecklistsService,
    message: NzMessageService,
    modal: NzModalService,
    public authService: AuthenticationService
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
