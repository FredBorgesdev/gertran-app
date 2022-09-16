import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../../shared/services/table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {User, UsersService} from '../users.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [ './users-list.component.css' ]
})
export class UsersListComponent extends BaseCrudListComponent<User> {
  searchInput: string;

  userColumn = [
    {
      title: 'Nome',
      compare: (
        a: User,
        b: User
      ) => a.name.localeCompare(b.name)
    },
    { title: 'CPF' },
    { title: 'Email' },
    { title: 'Celular' },
    { title: 'Ações' }
  ];

  constructor(
    private tableService: TableService,
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
