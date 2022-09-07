import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTypesFormComponent } from './document-types-form/document-types-form.component';
import { DocumentTypesListComponent } from './document-types-list/document-types-list.component';

const routes: Routes = [
  {
    path: 'document-types-list',
    component: DocumentTypesListComponent,
    data: {
      title: 'Tipos de Documentos',
      headerDisplay: 'none',
    }
  },
  {
    path: 'document-types-create',
    component: DocumentTypesFormComponent,
    data: {
      title: 'Crear Tipo de Documento',
      headerDisplay: 'none',
    }
  },
  {
    path: 'document-types-edit/:id',
    component: DocumentTypesFormComponent,
    data: {
      title: 'Editar Tipo de Documento',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypesRoutingModule { }
