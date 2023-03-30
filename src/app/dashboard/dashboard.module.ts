import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../environments/environment';

const antdModule = [
  NzButtonModule,
];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
    ...antdModule
  ],
  exports: [],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
