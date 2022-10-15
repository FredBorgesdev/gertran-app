import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { LoadUnloadByMacroComponent } from './load-unload-by-macro/load-unload-by-macro.component';
import {SharedModule} from '../shared/shared.module';
import { BaseCustomerFilterComponent } from './filters/base-customer-filter/base-customer-filter.component';
import { LoadUnloadByPointComponent } from './load-unload-by-point/load-unload-by-point.component';
import { LoadUnloadByRadiusComponent } from './load-unload-by-radius/load-unload-by-radius.component';
import { TripsLateComponent } from './trips-late/trips-late.component';


@NgModule({
  declarations: [
    LoadUnloadByMacroComponent,
    BaseCustomerFilterComponent,
    LoadUnloadByPointComponent,
    LoadUnloadByRadiusComponent,
    TripsLateComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
