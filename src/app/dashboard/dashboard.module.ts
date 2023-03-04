import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NzButtonModule} from 'ng-zorro-antd/button';

const antdModule = [
  NzButtonModule,
];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ...antdModule
  ],
  exports: [],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
