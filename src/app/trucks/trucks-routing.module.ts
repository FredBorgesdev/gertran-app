import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TrucksListComponent } from './trucks-list/trucks-list.component';
import { TrucksTruckComponent } from './trucks-truck/trucks-truck.component';

const routes: Routes = [
  {
    path: 'trucks-list',
    component: TrucksListComponent,
    data: {
      title: 'Usuários ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'truck-create',
    component: TrucksTruckComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'truck-edit/:id',
    component: TrucksTruckComponent,
    data: {
      title: 'Editar Usuário ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TrucksRoutingModule {}
