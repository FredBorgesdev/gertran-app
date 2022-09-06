import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompaniesFormComponent } from './insurance-companies-form/insurance-companies-form.component';
import { InsuranceCompaniesListComponent } from './insurance-companies-list/insurance-companies-list.component';

const routes: Routes = [
  {
    path: 'insurance-companies-list',
    component: InsuranceCompaniesListComponent,
    data: {
      title: 'Companhias de seguro ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'insurance-companies-create',
    component: InsuranceCompaniesFormComponent,
    data: {
      title: 'Criar companhia de seguro ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompaniesRoutingModule { }
