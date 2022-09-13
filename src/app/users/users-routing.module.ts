import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersUserComponent } from './users-user/users-user.component';

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
    component: UsersUserComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'user-edit/:id',
    component: UsersUserComponent,
    data: {
      title: 'Editar Usuário ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule {}
