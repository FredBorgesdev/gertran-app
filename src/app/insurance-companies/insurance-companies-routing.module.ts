import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompaniesListComponent } from './insurance-companies-list/insurance-companies-list.component';

const routes: Routes = [
  {
    path: 'insurance-companies-list',
    component: InsuranceCompaniesListComponent,
    data: {
      title: 'Companhias de seguro ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompaniesRoutingModule { }
