import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersUserComponent } from './users-user/users-user.component';
import {Permissions} from '../authentication/permissions';

const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent,
    data: {
      title: 'Usuários ',
      headerDisplay: 'none',
      permission: Permissions.USERS_VIEW_BASEUSER,
    }
  },
  {
    path: 'users-create',
    component: UsersUserComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none',
      permission: Permissions.USERS_ADD_BASEUSER,
    }
  },
  {
    path: 'users-edit/:id',
    component: UsersUserComponent,
    data: {
      title: 'Editar Usuário ',
      headerDisplay: 'none',
      permission: Permissions.USERS_CHANGE_BASEUSER,
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule {}
