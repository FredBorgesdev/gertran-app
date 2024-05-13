import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../../shared/services/table.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Wagon, WagonsService} from '../wagons.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Truck} from '../../trucks/trucks.service';

@Component({
  selector: 'app-wagons-list',
  templateUrl: './wagons-list.component.html',
  styleUrls: ['./wagons-list.component.css']
})
export class WagonsListComponent extends BaseCrudListComponent<Wagon> {
  searchInput: string;

  wagonColumn = [
    { title: 'ID' },
    { title: 'Modelo' },
    { title: 'Clientes' },
    { title: 'Tipo de modelo' },
    { title: 'Placa' },
    { title: 'Cidade/Estado' },
    { title: 'Cor' },
    { title: 'Ano' },
    { title: 'Chassi' },
    { title: 'Renavam' },
  ];

  constructor(
    private tableService: TableService,
    public authService: AuthenticationService,
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
    this.searchByField('plate', this.searchInput);
  }

  getCityState(wagon: Wagon): string {
    return `${wagon.vehicle.city} - ${wagon.vehicle.state}`;
  }

  getCustomerNames(wagon: Wagon): string {
    return wagon.vehicle.customers.map(c => c.tradingName).join(', ');
  }
}
