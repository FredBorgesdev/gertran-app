import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyReportRoutingModule { }
