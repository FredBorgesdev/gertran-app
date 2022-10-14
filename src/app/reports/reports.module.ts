import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { LoadUnloadByMacroComponent } from './load-unload-by-macro/load-unload-by-macro.component';
import {SharedModule} from '../shared/shared.module';
import { BaseCustomerFilterComponent } from './filters/base-customer-filter/base-customer-filter.component';


@NgModule({
  declarations: [
    LoadUnloadByMacroComponent,
    BaseCustomerFilterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
