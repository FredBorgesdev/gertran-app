import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {TableService} from '../../shared/services/table.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Truck, TrucksService} from '../trucks.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-trucks-list',
  templateUrl: './trucks-list.component.html',
  styleUrls: ['./trucks-list.component.css']
})
export class TrucksListComponent extends BaseCrudListComponent<Truck> implements OnInit {
  searchInput: string;

  truckColumns = [
    {title: 'ID'},
    {title: 'Modelo'},
    {title: 'Rastreador'},
    {title: 'Clientes'},
    {title: 'Tipo de modelo'},
    {title: 'Placa'},
    {title: 'Cidade/Estado'},
    {title: 'Cor'},
    {title: 'Ano'},
    {title: 'Chassi'},
    {title: 'Renavam'},
    {title: 'Eixos'},
    {title: 'Cubagem'},
    {title: 'Terminais'},
    {title: ''}
  ];

  constructor(
    private tableService: TableService,
    public authService: AuthenticationService,
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
    this.searchByField('plate', this.searchInput);
  }

  getCityState(truck: Truck): string {
    return `${truck.vehicle.city} - ${truck.vehicle.state}`;
  }

  getCustomerNames(truck: Truck): string {
    return truck.vehicle.customers.map(c => c.tradingName).join(', ');
  }

  getTracker(truck: Truck): string {
    return truck.vehicle.trackers.map(t => `${t.trackerModel.trackerTechnology.name} (${t.trackerId})`).join(', ');
  }

  getTerminals(truck: Truck): string {
    if (!truck.vehicle.terminals || !truck.vehicle.terminals.length) {
      return '-';
    }

    return truck.vehicle.terminals.map(t => t.name).join(', ');
  }

  create(){
    this.router.navigate(['/trucks/trucks-create', this.getCustomerUUID()]);
  }

  edit(item){
    this.router.navigate(['/trucks/trucks-edit', item.id,this.getCustomerUUID()]);
  }

  getCustomerUUID(){
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const uuid = urlParts[urlParts.length - 1];
    return uuid
  }
}
