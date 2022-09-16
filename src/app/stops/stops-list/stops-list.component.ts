import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Stop, StopsService} from '../stops.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TableService} from '../../shared/services/table.service';

@Component({
  selector: 'app-stops-list',
  templateUrl: './stops-list.component.html',
  styleUrls: ['./stops-list.component.css']
})
export class StopsListComponent extends BaseCrudListComponent<Stop> {
  searchInput = '';

  stopColumns = [
    {
      title: 'Nome',
      compare: (
        a: Stop,
        b: Stop
      ) => a.name.localeCompare(b.name)
    },
    {
      title: 'Descrição',
      compare: (
        a: Stop,
        b: Stop
      ) => a.description.localeCompare(b.description)
    },
    {
      title: 'Endereço',
      compare: (
        a: Stop,
        b: Stop
      ) => a.address.localeCompare(b.address)
    },
    { title: 'Raio' },
    { title: 'Tipo' },
    { title: 'Ações' },
  ];

  constructor(
    private tableService: TableService,
    router: Router,
    message: NzMessageService,
    modal: NzModalService,
    service: StopsService
  ) {
    super(
      'stops',
      router,
      service,
      message,
      modal
    );
  }

  search(): void {
    const data = this.resources;
    this.resources.results = this.tableService.search(this.searchInput, data.results);
  }
}
