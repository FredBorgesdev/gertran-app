import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InsuranceCompaniesRoutingModule} from './insurance-companies-routing.module';
import {InsuranceCompaniesListComponent} from './insurance-companies-list/insurance-companies-list.component';
import {SharedModule} from '../shared/shared.module';
import {InsuranceCompaniesFormComponent} from './insurance-companies-form/insurance-companies-form.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";


@NgModule({
  declarations: [
    InsuranceCompaniesListComponent,
    InsuranceCompaniesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InsuranceCompaniesRoutingModule,
    NzSwitchModule
  ]
})
export class InsuranceCompaniesModule {
}
