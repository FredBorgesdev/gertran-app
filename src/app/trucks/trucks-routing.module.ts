import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TrucksListComponent } from './trucks-list/trucks-list.component';
import { TrucksTruckComponent } from './trucks-truck/trucks-truck.component';
import {Permissions} from '../authentication/permissions';

const routes: Routes = [
  {
    path: 'trucks-list',
    component: TrucksListComponent,
    data: {
      title: 'Usuários ',
      headerDisplay: 'none',
      permission: Permissions.VEHICLES_VIEW_TRUCK,
    }
  },
  {
    path: 'trucks-create',
    component: TrucksTruckComponent,
    data: {
      title: 'Adicionar Carreta ',
      headerDisplay: 'none',
      // permission: Permissions.VEHICLES_ADD_TRUCK,
    }
  },
  {
    path: 'trucks-create/:customer_id',
    component: TrucksTruckComponent,
    data: {
      title: 'Adicionar Carreta ',
      headerDisplay: 'none',
      permission: Permissions.VEHICLES_ADD_TRUCK,
    }
  },
  {
    path: 'trucks-edit/:id/:customer_id',
    component: TrucksTruckComponent,
    data: {
      title: 'Editar Carreta ',
      headerDisplay: 'none',
      // permission: Permissions.VEHICLES_CHANGE_TRUCK,
    },
  },
  {
    path: 'trucks-edit/:id',
    component: TrucksTruckComponent,
    data: {
      title: 'Editar Carreta ',
      headerDisplay: 'none',
      permission: Permissions.VEHICLES_CHANGE_TRUCK,
    },
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TrucksRoutingModule {}
