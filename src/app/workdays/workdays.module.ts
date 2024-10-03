import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WorkdayAutomationsFormComponent } from './workday-automations-form/workday-automations-form.component';
import { WorkdayAutomationsTabComponent } from './workday-automations-tab/workday-automations-tab.component';
import { WorkdayAutomationsTableComponent } from './workday-automations-table/workday-automations-table.component';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule, Routes } from '@angular/router';
import { WorkdayTabComponent } from './workday-tab/workday-tab.component';
import { WorkdayJustifyComponent } from './workday-justify/workday-justify.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { WorkdayFormCreateComponent } from './workday-form-create/workday-form-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

const routes: Routes = [
  {
    path: 'workday-list',
    component: WorkdayJustifyComponent,
    data: {
      title: 'Registros',
      headerDisplay: 'none',
    }
  },
];

@NgModule({
  declarations: [
    WorkdayAutomationsFormComponent,
    WorkdayAutomationsTabComponent,
    WorkdayAutomationsTableComponent,
    WorkdayTabComponent,
    WorkdayJustifyComponent,
    WorkdayFormCreateComponent,
    // BaseWorkdayFilterComponent
  ],
  exports: [
    WorkdayAutomationsFormComponent,
    WorkdayAutomationsTabComponent,
    WorkdayAutomationsTableComponent,
    WorkdayTabComponent,
    WorkdayJustifyComponent,
    RouterModule,
    NzSpinModule,
    NzFormControlComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TextMaskModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzSpinModule,
    RouterModule.forChild(routes),
  ]
})
export class WorkdaysModule { }
