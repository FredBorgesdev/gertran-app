import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DdrsFormComponent } from './ddrs-form/ddrs-form.component';
import { DdrsListComponent } from './ddrs-list/ddrs-list.component';

const routes: Routes = [
  {
    path: 'ddrs-list',
    component: DdrsListComponent,
    data: {
      title: 'Seguradoras',
      headerDisplay: 'none',
    }
  },
  {
    path: 'ddrs-create',
    component: DdrsFormComponent,
    data: {
      title: 'Criar seguradora ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'ddrs-edit/:id',
    component: DdrsFormComponent,
    data: {
      title: 'Editar seguradora ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DdrsRoutingModule { }
