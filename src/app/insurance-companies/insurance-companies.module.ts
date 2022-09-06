import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceCompaniesRoutingModule } from './insurance-companies-routing.module';
import { InsuranceCompaniesListComponent } from './insurance-companies-list/insurance-companies-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InsuranceCompaniesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InsuranceCompaniesRoutingModule
  ]
})
export class InsuranceCompaniesModule { }
