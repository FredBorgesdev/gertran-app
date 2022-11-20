import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChecklistListComponent} from './checklist-list/checklist-list.component';
import {ChecklistsRoutingModule} from './checklists-routing.module';
import {SharedModule} from '../shared/shared.module';
import { ChecklistsCreateComponent } from './checklists-create/checklists-create.component';

@NgModule({
  declarations: [
    ChecklistListComponent,
    ChecklistsCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChecklistsRoutingModule,
  ]
})
export class ChecklistsModule { }
