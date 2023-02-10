import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {WorkdayAutomationsFormComponent} from './workday-automations-form/workday-automations-form.component';
import {WorkdayAutomationsTabComponent} from './workday-automations-tab/workday-automations-tab.component';
import {WorkdayAutomationsTableComponent} from './workday-automations-table/workday-automations-table.component';
import {WorkdayTabComponent} from './workday-tab/workday-tab.component';
import {TextMaskModule} from 'angular2-text-mask';
@NgModule({
  declarations: [
    WorkdayAutomationsFormComponent,
    WorkdayAutomationsTabComponent,
    WorkdayAutomationsTableComponent,
    WorkdayTabComponent,
  ],
  exports: [
    WorkdayAutomationsFormComponent,
    WorkdayAutomationsTabComponent,
    WorkdayAutomationsTableComponent,
    WorkdayTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TextMaskModule,
  ]
})
export class WorkdaysModule { }
