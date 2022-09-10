import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleModelTypesFormComponent } from './vehicle-model-types-form/vehicle-model-types-form.component';
import { VehicleModelTypesListComponent } from './vehicle-model-types-list/vehicle-model-types-list.component';

const routes: Routes = [
  {
    path: 'vehicle-model-types-list',
    component: VehicleModelTypesListComponent,
    data: {
      title: 'Tipos de Veiculos',
      headerDisplay: 'none',
    }
  },
  {
    path: 'vehicle-model-types-create',
    component: VehicleModelTypesFormComponent,
    data: {
      title: 'Criar Tipos de Veiculos ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'vehicle-model-types-edit/:id',
    component: VehicleModelTypesFormComponent,
    data: {
      title: 'Editar Tipos de Veiculos ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleModelTypesRoutingModule { }

