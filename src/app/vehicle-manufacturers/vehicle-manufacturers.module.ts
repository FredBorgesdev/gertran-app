import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleManufacturersRoutingModule } from './vehicle-manufacturers-routing.module';
import { VehicleManufacturersListComponent } from './vehicle-manufacturers-list/vehicle-manufacturers-list.component';
import { SharedModule } from '../shared/shared.module';
import { VehicleManufacturersFormComponent } from './vehicle-manufacturers-form/vehicle-manufacturers-form.component';


@NgModule({
  declarations: [
    VehicleManufacturersListComponent,
    VehicleManufacturersFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehicleManufacturersRoutingModule
  ]
})
export class VehicleManufacturersModule { }

