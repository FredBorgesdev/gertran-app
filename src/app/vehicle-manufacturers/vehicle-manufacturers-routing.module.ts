import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleManufacturersFormComponent } from './vehicle-manufacturers-form/vehicle-manufacturers-form.component';
import { VehicleManufacturersListComponent } from './vehicle-manufacturers-list/vehicle-manufacturers-list.component';

const routes: Routes = [
  {
    path: 'vehicle-manufacturers-list',
    component: VehicleManufacturersListComponent,
    data: {
      title: 'Construtoras',
      headerDisplay: 'none',
    }
  },
  {
    path: 'vehicle-manufacturers-create',
    component: VehicleManufacturersFormComponent,
    data: {
      title: 'Criar Construtoras ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'vehicle-manufacturers-edit/:id',
    component: VehicleManufacturersFormComponent,
    data: {
      title: 'Editar Construtoras ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleManufacturersRoutingModule { }

