import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { SharedModule } from '../shared/shared.module';
import { RoutesFormComponent } from './routes-form/routes-form.component';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import {DragDropModule} from '@angular/cdk/drag-drop';

const antdModules = [
  NzTransferModule
];

@NgModule({
  declarations: [
    RoutesListComponent,
    RoutesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutesRoutingModule,
    DragDropModule,
    ...antdModules
  ]
})
export class RoutesModule { }
