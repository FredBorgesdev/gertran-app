import {RouterModule, Routes} from '@angular/router';
import {ChecklistListComponent} from './checklist-list/checklist-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: 'checklist-list', component: ChecklistListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
