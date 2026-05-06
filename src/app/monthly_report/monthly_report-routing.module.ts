import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyReportSelectComponent } from './monthly-report-select.component/monthly-report-select.component';
import { MonthlyReportPrintLayoutComponent } from './monthly-report-print-layout/monthly-report-print-layout';

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
    path: 'impressao',
    component: MonthlyReportPrintLayoutComponent,
    data: {
      title: 'Monthly Report Print',
      headerDisplay: 'none',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyReportRoutingModule { }
