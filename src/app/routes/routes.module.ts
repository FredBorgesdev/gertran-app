import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { SharedModule } from '../shared/shared.module';
import { RoutesFormComponent } from './routes-form/routes-form.component';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { StopsMapComponent } from './stops-map/stops-map.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../environments/environment';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';

const antdModules = [
  NzTransferModule
];

@NgModule({
  declarations: [
    RoutesListComponent,
    RoutesFormComponent,
    StopsMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutesRoutingModule,
    DragDropModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
    ...antdModules,
    NzCollapseModule
  ]
})
export class RoutesModule { }
