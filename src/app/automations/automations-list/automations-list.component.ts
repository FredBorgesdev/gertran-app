import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

import { TableService } from '../../shared/services/table.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Automation, AutomationsService} from '../automations.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-automations-list',
  templateUrl: './automations-list.component.html',
  styleUrls: ['./automations-list.component.css']
})
export class AutomationsListComponent extends BaseCrudListComponent<Automation> {
  searchInput = '';

  automationColumn = [
    { title: 'ID' },
    { title: 'Nome' },
    { title: 'Evento' },
    { title: 'Ação' },
    { title: 'SM Viagem' },
    { title: 'MSG Veículo' },
    { title: 'Tempo Ação' },
    { title: 'Velocidade' },
    { title: 'Ignição' },
    { title: 'Comando' },
    { title: 'Ações' }
  ];

  constructor(
    private tableService: TableService,
    private modalService: NzModalService,
    router: Router,
    service: AutomationsService,
    message: NzMessageService,
  ) {
    super(
      'automations',
      router,
      service,
      message,
      modalService,
    );
  }

  search(): void {
    console.log(this.searchInput);
  }
}
