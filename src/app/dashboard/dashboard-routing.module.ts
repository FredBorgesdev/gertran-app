import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LogisticReportComponent } from '../reports/logistic-report/logistic-report.component';

const routes: Routes = [
  {
    path: 'home',
    component: LogisticReportComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none',
    },
  },
];

// TODO: Remove when all reports are implemented
new Array(30).fill(0).forEach((_, i) => {
  routes.push({
    path: `reports${i}`,
    component: DashboardComponent,
  });
});

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
