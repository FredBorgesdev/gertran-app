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
      headerDisplay: 'none',
      permission: 'truck.view_truck',
    }
  },
  {
    path: 'trucks-create',
    component: TrucksTruckComponent,
    data: {
      title: 'Adicionar Carreta ',
      headerDisplay: 'none',
      permission: 'truck.add_truck',
    }
  },
  {
    path: 'trucks-edit/:id',
    component: TrucksTruckComponent,
    data: {
      title: 'Editar Carreta ',
      headerDisplay: 'none',
      permission: 'truck.change_truck',
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TrucksRoutingModule {}
