import {Component, Input, OnInit} from '@angular/core';
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
export class UsersListComponent extends BaseCrudListComponent<AbstractUser> implements OnInit {
  searchInput: string;
  customer: string;
  @Input() showHeader = true

  userColumn = [
    { title: 'ID' },
    { title: 'Nome' },
    { title: 'Email' },
    { title: 'Usuário GERTRAN 2.0' },
    { title: 'Último Login' },
    { title: 'Usuário Ativo' },
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

  ngOnInit(): void {
    super.ngOnInit();
  }

  search(): void {
    this.searchByField('search', this.searchInput);
  }

  create(){
    const userRouteResolve = this.getCustomerUUID() != 'users-list' ?this.getCustomerUUID():''
    this.router.navigate(['users', `users-create`, userRouteResolve]);
  }

  edit(item){
    const userRouteResolve = this.getCustomerUUID() != 'users-list' ?this.getCustomerUUID():''
    this.router.navigate(['users', `users-edit`,item.id, userRouteResolve]);
  }

  getCustomerUUID(){
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const uuid = urlParts[urlParts.length - 1];
    return uuid
  }
}
