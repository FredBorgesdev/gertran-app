import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { WagonsListComponent } from './wagons-list/wagons-list.component';
import { WagonsWagonComponent } from './wagons-wagon/wagons-wagon.component';

const routes: Routes = [
  {
    path: 'wagons-list',
    component: WagonsListComponent,
    data: {
      title: 'Carretas ',
      headerDisplay: 'none',
      permission: 'wagon.view_wagon',
    }
  },
  {
    path: 'wagons-create',
    component: WagonsWagonComponent,
    data: {
      title: 'Adicionar Carreta ',
      headerDisplay: 'none',
      permission: 'wagon.add_wagon',
    }
  },
  {
    path: 'wagons-edit/:id',
    component: WagonsWagonComponent,
    data: {
      title: 'Editar Carreta ',
      headerDisplay: 'none',
      permission: 'wagon.change_wagon',
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WagonsRoutingModule {}
