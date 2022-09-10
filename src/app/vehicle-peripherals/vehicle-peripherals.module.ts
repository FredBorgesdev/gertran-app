import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclePeripheralsRoutingModule } from './vehicle-peripherals-routing.module';
import { VehiclePeripheralsListComponent } from './vehicle-peripherals-list/vehicle-peripherals-list.component';
import { SharedModule } from '../shared/shared.module';
import { VehiclePeripheralsFormComponent } from './vehicle-peripherals-form/vehicle-peripherals-form.component';


@NgModule({
  declarations: [
    VehiclePeripheralsListComponent,
    VehiclePeripheralsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehiclePeripheralsRoutingModule
  ]
})
export class VehiclePeripheralsModule { }

