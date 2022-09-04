import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RoutesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
