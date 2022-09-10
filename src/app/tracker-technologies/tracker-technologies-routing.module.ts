import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerTechnologiesFormComponent } from './tracker-technologies-form/tracker-technologies-form.component';
import { TrackerTechnologiesListComponent } from './tracker-technologies-list/tracker-technologies-list.component';

const routes: Routes = [
  {
    path: 'tracker-technologies-list',
    component: TrackerTechnologiesListComponent,
    data: {
      title: 'Tecnologias',
      headerDisplay: 'none',
    }
  },
  {
    path: 'tracker-technologies-create',
    component: TrackerTechnologiesFormComponent,
    data: {
      title: 'Criar Tecnologias ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'tracker-technologies-edit/:id',
    component: TrackerTechnologiesFormComponent,
    data: {
      title: 'Editar Tecnologias ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerTechnologiesRoutingModule { }

