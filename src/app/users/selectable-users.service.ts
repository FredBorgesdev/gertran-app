import { Injectable } from '@angular/core';
import {User, UsersService} from './users.service';
import {Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectableUsersService {
  users: User[] = [];
  isLoadingMoreData: boolean;
  customersNextUrl: string;
  searchUserSubject = new Subject<string>();

  constructor(
    private usersService: UsersService,
    private message: NzMessageService,
  ) {}

  init(): void {
    this.loadMoreUsers();
    this.setupSearch();
  }

  loadMoreUsers(): void {
    this.isLoadingMoreData = true;
    this.usersService.getAll({
      limit: 50,
      url: this.customersNextUrl
    }).subscribe((users) => {
      this.customersNextUrl = users.next;
      this.users = [...this.users, ...users.results];
      this.isLoadingMoreData = false;
    });
  }

  searchByName(name: string): void {
    if (name === '') {
      this.customersNextUrl = null;
      this.loadMoreUsers();
    } else {
      this.searchUserSubject.next(name);
    }
  }

  appendCustomer(user: User): void {
    this.users = [user, ...this.users];
  }

  concatCustomers(users: User[]): void {
    this.users = this.users.concat(users);
  }

  private setupSearch(): void {
    this.searchUserSubject.pipe(debounceTime(500)).subscribe((name) => {
      this.usersService.getAll({ limit: 50 }, { name }).subscribe((result) => {
        this.users = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }
}
