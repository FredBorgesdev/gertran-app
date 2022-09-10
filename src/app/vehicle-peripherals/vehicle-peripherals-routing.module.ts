import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclePeripheralsFormComponent } from './vehicle-peripherals-form/vehicle-peripherals-form.component';
import { VehiclePeripheralsListComponent } from './vehicle-peripherals-list/vehicle-peripherals-list.component';

const routes: Routes = [
  {
    path: 'vehicle-peripherals-list',
    component: VehiclePeripheralsListComponent,
    data: {
      title: 'Perifericos',
      headerDisplay: 'none',
    }
  },
  {
    path: 'vehicle-peripherals-create',
    component: VehiclePeripheralsFormComponent,
    data: {
      title: 'Criar Perifericos ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'vehicle-peripherals-edit/:id',
    component: VehiclePeripheralsFormComponent,
    data: {
      title: 'Editar Perifericos ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclePeripheralsRoutingModule { }

