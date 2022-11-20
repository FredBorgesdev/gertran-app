import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChecklistListComponent} from './checklist-list/checklist-list.component';
import {ChecklistsRoutingModule} from './checklists-routing.module';
import {SharedModule} from '../shared/shared.module';
import { ChecklistsCreateComponent } from './checklists-create/checklists-create.component';
import { ChecklistsReviewComponent } from './checklists-review/checklists-review.component';

@NgModule({
  declarations: [
    ChecklistListComponent,
    ChecklistsCreateComponent,
    ChecklistsReviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChecklistsRoutingModule,
  ]
})
export class ChecklistsModule { }
