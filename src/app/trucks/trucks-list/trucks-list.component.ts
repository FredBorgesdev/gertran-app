import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../../shared/services/table.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Truck, TrucksService} from '../trucks.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-trucks-list',
  templateUrl: './trucks-list.component.html',
  styleUrls: [ './trucks-list.component.css' ]
})
export class TrucksListComponent extends BaseCrudListComponent<Truck> {
  searchInput: string;

  constructor(
    private tableService: TableService,
    router: Router,
    service: TrucksService,
    message: NzMessageService,
    modal: NzModalService
  ) {
    super(
      'trucks',
      router,
      service,
      message,
      modal
    );
  }

  search(): void {
    this.resources.results = this.tableService.search(
      this.searchInput,
      this.resources.results
    );
  }
}
