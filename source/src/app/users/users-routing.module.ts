import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

import { UsersFormComponent } from './users-form/users-form.component'
import { UsersListComponent } from './users-list/users-list.component'

const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent,
    data: {
      title: 'Usuários ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'user-create',
    component: UsersFormComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'user-edit/:id',
    component: UsersFormComponent,
    data: {
      title: 'Editar Usuário ',
      headerDisplay: 'none'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule {}
