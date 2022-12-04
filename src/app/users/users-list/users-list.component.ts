import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../../shared/services/table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {AbstractUser, UsersService} from '../users.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [ './users-list.component.css' ]
})
export class UsersListComponent extends BaseCrudListComponent<AbstractUser> {
  searchInput: string;

  userColumn = [
    { title: 'ID' },
    {
      title: 'Nome',
      compare: (
        a: AbstractUser,
        b: AbstractUser
      ) => a.name.localeCompare(b.name)
    },
    {
      title: 'Email',
      compare: (
        a: AbstractUser,
        b: AbstractUser
      ) => a.email.localeCompare(b.email)
    },
    { title: 'Último Login' },
    { title: 'Admnistrador?' },
    { title: 'Usuário Ativo?' },
    { title: 'Ações' }
  ];

  constructor(
    private tableService: TableService,
    public authService: AuthenticationService,
    router: Router,
    message: NzMessageService,
    modal: NzModalService,
    service: UsersService
  ) {
    super(
      'users',
      router,
      service,
      message,
      modal
    );
  }

  search(): void {
    this.resources.results = this.tableService.search(
      this.searchInput,
      this.resources.results
    );
  }
}
