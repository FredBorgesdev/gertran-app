import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopsRoutingModule } from './stops-routing.module';
import { StopsListComponent } from './stops-list/stops-list.component';
import { SharedModule } from '../shared/shared.module';
import { StopsStopComponent } from './stops-stop/stops-stop.component';


@NgModule({
  declarations: [
    StopsListComponent,
    StopsStopComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StopsRoutingModule
  ]
})
export class StopsModule { }
