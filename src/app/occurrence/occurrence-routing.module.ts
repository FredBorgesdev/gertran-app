import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OccurenceFormComponent} from './occurrence-form/occurrence-form.component';

const routes: Routes = [
  {
    path: 'occurrence-form',
    component: OccurenceFormComponent,
    data: {
      title: 'Ocorrencia',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccurrenceRoutingModule { }
