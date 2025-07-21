import {RouterModule, Routes} from '@angular/router';
import {ChecklistListComponent} from './checklist-list/checklist-list.component';
import {NgModule} from '@angular/core';
import {ChecklistsCreateComponent} from './checklists-create/checklists-create.component';
import {ChecklistsReviewComponent} from './checklists-review/checklists-review.component';
import { CheckListExpirationComponent } from './checklist-expiration/checklist-expiration.component';

const routes: Routes = [
  { path: 'checklists-list', component: ChecklistListComponent },
  { path: 'checklists-create', component: ChecklistsCreateComponent },
  { path: 'checklists-review/:id', component: ChecklistsReviewComponent },
  { path: 'checklists-expiration', component: CheckListExpirationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
