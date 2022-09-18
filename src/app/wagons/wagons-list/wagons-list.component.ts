import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../../shared/services/table.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Wagon, WagonsService} from '../wagons.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-wagons-list',
  templateUrl: './wagons-list.component.html',
  styleUrls: ['./wagons-list.component.css']
})
export class WagonsListComponent extends BaseCrudListComponent<Wagon> {
  searchInput: string;

  wagonColumn = [
    { title: 'ID' },
    {
      title: 'Placa',
      compare: (
        a: Wagon,
        b: Wagon
      ) => a.plate.localeCompare(b.plate)
    },
    {
      title: 'Marca',
      compare: (
        a: Wagon,
        b: Wagon
      ) => a.brand.localeCompare(b.brand)
    },
    {
      title: 'Modelo',
      compare: (
        a: Wagon,
        b: Wagon
      ) => a.model.localeCompare(b.model)
    },
    { title: 'Ano' },
    { title: 'Cor' },
    { title: 'Ações' }
  ];

  constructor(
    private tableService: TableService,
    router: Router,
    service: WagonsService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'wagons',
      router,
      service,
      message,
      modal,
    );
  }

  search(): void {
    this.resources.results = this.tableService.search(
      this.searchInput,
      this.resources.results
    );
  }
}
