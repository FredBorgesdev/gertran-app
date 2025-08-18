import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyReportFormComponent } from './monthly_report-form/monthly_report-form.component';
import { MonthlyReportListComponent } from './monthly_report-list/monthly_report-list.component';
import { MonthlyReportSelectComponent } from './monthly-report-select.component/monthly-report-select.component';

const routes: Routes = [
  {
    path: 'monthly_report',
    component: MonthlyReportSelectComponent,
    data: {
      title: 'Monthly Report',
      headerDisplay: 'none',
    }
  },
  {
    path: 'monthly_report-list',
    component: MonthlyReportListComponent,
    data: {
      title: 'MonthlyReport List',
      headerDisplay: 'none',
    }
  },
  {
    path: 'monthly_report-create',
    component: MonthlyReportFormComponent,
    data: {
      title: 'Criar MonthlyReport',
      headerDisplay: 'none',
    }
  },
  {
    path: 'monthly_report-edit/:id',
    component: MonthlyReportFormComponent,
    data: {
      title: 'Editar MonthlyReport',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyReportRoutingModule { }
