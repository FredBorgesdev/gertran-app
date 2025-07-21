import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChecklistListComponent} from './checklist-list/checklist-list.component';
import {ChecklistsRoutingModule} from './checklists-routing.module';
import {SharedModule} from '../shared/shared.module';
import { ChecklistsCreateComponent } from './checklists-create/checklists-create.component';
import { ChecklistsReviewComponent } from './checklists-review/checklists-review.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CheckListExpirationComponent } from './checklist-expiration/checklist-expiration.component';

@NgModule({
  declarations: [
    ChecklistListComponent,
    ChecklistsCreateComponent,
    ChecklistsReviewComponent,
    CheckListExpirationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChecklistsRoutingModule,
    NzTableModule,
    NzPaginationModule,
  ]
})
export class ChecklistsModule { }
