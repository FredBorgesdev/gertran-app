import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleModelTypesRoutingModule } from './vehicle-model-types-routing.module';
import { VehicleModelTypesListComponent } from './vehicle-model-types-list/vehicle-model-types-list.component';
import { SharedModule } from '../shared/shared.module';
import { VehicleModelTypesFormComponent } from './vehicle-model-types-form/vehicle-model-types-form.component';


@NgModule({
  declarations: [
    VehicleModelTypesListComponent,
    VehicleModelTypesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehicleModelTypesRoutingModule
  ]
})
export class VehicleModelTypesModule { }

