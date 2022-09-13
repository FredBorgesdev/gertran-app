import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VehicleManufacturersService, VehicleManufacturers } from '../vehicle-manufacturers.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-vehicle-manufacturers-list',
  templateUrl: './vehicle-manufacturers-list.component.html',
  styleUrls: ['./vehicle-manufacturers-list.component.css'],
})
export class VehicleManufacturersListComponent extends BaseCrudListComponent<VehicleManufacturers> {
  vehicleManufacturersColumns = [
    { title: 'Nome' },
    { title: 'Faz caminhões?' },
    { title: 'Faz carretas?' },
    { title: 'Ações' },
  ];

  constructor(
    router: Router,
    service: VehicleManufacturersService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'vehicle-manufacturers',
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
}
