import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChecklistListComponent} from './checklist-list/checklist-list.component';
import {ChecklistsRoutingModule} from './checklists-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ChecklistListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChecklistsRoutingModule,
  ]
})
export class ChecklistsModule { }
