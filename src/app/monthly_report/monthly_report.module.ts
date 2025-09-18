import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyReportRoutingModule } from './monthly_report-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { MonthlyReportSelectComponent } from './monthly-report-select.component/monthly-report-select.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MonthlyReportSelectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MonthlyReportRoutingModule,
    NzSwitchModule,
    NgChartsModule, // importe aqui
  ]
})
export class MonthlyReportModule { }
