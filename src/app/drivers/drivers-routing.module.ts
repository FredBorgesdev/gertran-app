import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { DriversDriverComponent } from './drivers-driver/drivers-driver.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';

const routes: Routes = [
  {
    path: 'drivers-list',
    component: DriversListComponent,
    data: {
      title: 'Motoristas ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'driver-create/:customer_id',
    component: DriversDriverComponent,
    data: {
      title: 'Adicionar Motorista ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'driver-edit/:id',
    component: DriversDriverComponent,
    data: {
      title: 'Editar Motorista ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'driver-edit/:id/:customer_id',
    component: DriversDriverComponent,
    data: {
      title: 'Editar Motorista ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DriversRoutingModule {}
