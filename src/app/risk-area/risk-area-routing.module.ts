import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskAreaFormComponent } from './risk-area-form/risk-area-form.component';
import { RiskAreaListComponent } from './risk-area-list/risk-area-list.component';

const routes: Routes = [
  {
    path: 'risk-area-list',
    component: RiskAreaListComponent,
    data: {
      title: 'RiskArea List',
      headerDisplay: 'none',
    }
  },
  {
    path: 'risk-area-create',
    component: RiskAreaFormComponent,
    data: {
      title: 'Criar RiskArea',
      headerDisplay: 'none',
    }
  },
  {
    path: 'risk-area-edit/:id',
    component: RiskAreaFormComponent,
    data: {
      title: 'Editar RiskArea',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskAreaRoutingModule { }
