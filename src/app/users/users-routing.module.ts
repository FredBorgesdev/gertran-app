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
      headerDisplay: 'none',
      permission: 'baseuser.view_baseuser',
    }
  },
  {
    path: 'users-create',
    component: UsersUserComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none',
      permission: 'baseuser.add_baseuser',
    }
  },
  {
    path: 'users-edit/:id',
    component: UsersUserComponent,
    data: {
      title: 'Editar Usuário ',
      headerDisplay: 'none',
      permission: 'baseuser.change_baseuser',
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule {}
