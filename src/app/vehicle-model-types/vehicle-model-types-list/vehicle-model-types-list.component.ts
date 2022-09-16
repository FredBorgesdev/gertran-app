import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VehicleModelTypesService, VehicleModelTypes } from '../vehicle-model-types.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-vehicle-model-types-list',
  templateUrl: './vehicle-model-types-list.component.html',
  styleUrls: ['./vehicle-model-types-list.component.css'],
})
export class VehicleModelTypesListComponent extends BaseCrudListComponent<VehicleModelTypes> {
  vehicleModelTypesColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ];

  constructor(
    router: Router,
    service: VehicleModelTypesService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'vehicle-model-types',
      router,
      service,
      message,
      modal,
    );
  }
}
