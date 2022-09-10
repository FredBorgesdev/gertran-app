import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(name) %>FormComponent } from './<%= dasherize(name) %>-form/<%= dasherize(name) %>-form.component';
import { <%= classify(name) %>ListComponent } from './<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component';

const routes: Routes = [
  {
    path: '<%= dasherize(name) %>-list',
    component: <%= classify(name) %>ListComponent,
    data: {
      title: '<%= ptName %>',
      headerDisplay: 'none',
    }
  },
  {
    path: '<%= dasherize(name) %>-create',
    component: <%= classify(name) %>FormComponent,
    data: {
      title: 'Criar <%= ptName %> ',
      headerDisplay: 'none',
    }
  },
  {
    path: '<%= dasherize(name) %>-edit/:id',
    component: <%= classify(name) %>FormComponent,
    data: {
      title: 'Editar <%= ptName %> ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule { }

