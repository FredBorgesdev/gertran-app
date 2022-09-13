import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VehiclePeripheralsService, VehiclePeripherals } from '../vehicle-peripherals.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-vehicle-peripherals-list',
  templateUrl: './vehicle-peripherals-list.component.html',
  styleUrls: ['./vehicle-peripherals-list.component.css'],
})
export class VehiclePeripheralsListComponent extends BaseCrudListComponent<VehiclePeripherals> {
  vehiclePeripheralsColumns = [
    { title: 'Nome' },
    { title: 'Tipo de periferico' },
    { title: 'Ações' },
  ];

  constructor(
    router: Router,
    service: VehiclePeripheralsService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'vehicle-peripherals',
      router,
      service,
      message,
      modal,
    );
  }

  loadResources(url?: string): void {
    this.isLoading = true;
    this.service.getAll({ url }).subscribe((data) => {
      this.resources = data;
      this.isLoading = false;
    });
  }

  getPeripheralType(type: string): string {
    if (type === 'actuator') {
      return 'Atuador';
    }
    if (type === 'sensor') {
      return 'Sensor';
    }
  }
}
