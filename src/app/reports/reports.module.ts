import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { LoadUnloadByMacroComponent } from './load-unload-by-macro/load-unload-by-macro.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    LoadUnloadByMacroComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
