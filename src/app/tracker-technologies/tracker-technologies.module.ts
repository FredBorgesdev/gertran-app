import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerTechnologiesRoutingModule } from './tracker-technologies-routing.module';
import { TrackerTechnologiesListComponent } from './tracker-technologies-list/tracker-technologies-list.component';
import { SharedModule } from '../shared/shared.module';
import { TrackerTechnologiesFormComponent } from './tracker-technologies-form/tracker-technologies-form.component';


@NgModule({
  declarations: [
    TrackerTechnologiesListComponent,
    TrackerTechnologiesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrackerTechnologiesRoutingModule
  ]
})
export class TrackerTechnologiesModule { }

