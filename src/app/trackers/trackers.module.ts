import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackersFormComponent } from './trackers-form/trackers-form.component';
import { TrackersTabComponent } from './trackers-tab/trackers-tab.component';
import { TrackersTableComponent } from './trackers-table/trackers-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TrackersFormComponent,
    TrackersTabComponent,
    TrackersTableComponent,
  ],
  exports: [
    TrackersFormComponent,
    TrackersTabComponent,
    TrackersTableComponent,
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class TrackersModule { }
