import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopsListComponent } from './stops-list/stops-list.component';

const routes: Routes = [
  {
    path: 'stops-list',
    component: StopsListComponent,
    data: {
      title: 'Pontos ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule { }
