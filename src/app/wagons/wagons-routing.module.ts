import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { WagonsListComponent } from './wagons-list/wagons-list.component';
import { WagonsWagonComponent } from './wagons-wagon/wagons-wagon.component';
import {Permissions} from '../authentication/permissions';

const routes: Routes = [
  {
    path: 'wagons-list',
    component: WagonsListComponent,
    data: {
      title: 'Carretas ',
      headerDisplay: 'none',
      permission: Permissions.VEHICLES_VIEW_WAGON,
    }
  },
  {
    path: 'wagons-create/:customer_id',
    component: WagonsWagonComponent,
    data: {
      title: 'Adicionar Carreta ',
      headerDisplay: 'none',
      permission: Permissions.VEHICLES_ADD_WAGON,
    }
  },
  {
    path: 'wagons-edit/:id/:customer_id',
    component: WagonsWagonComponent,
    data: {
      title: 'Editar Carreta ',
      headerDisplay: 'none',
      permission: Permissions.VEHICLES_CHANGE_WAGON,
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WagonsRoutingModule {}
