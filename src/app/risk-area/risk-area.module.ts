import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskAreaRoutingModule } from './risk-area-routing.module';
import { RiskAreaListComponent } from './risk-area-list/risk-area-list.component';
import { SharedModule } from '../shared/shared.module';
import { RiskAreaFormComponent } from './risk-area-form/risk-area-form.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [
    RiskAreaListComponent,
    RiskAreaFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RiskAreaRoutingModule,
    NzSwitchModule
  ]
})
export class RiskAreaModule { }
