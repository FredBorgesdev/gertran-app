import { Injectable } from '@angular/core';
import {AbstractUser, UsersService} from './users.service';
import {Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectableUsersService {
  users: AbstractUser[] = [];
  isLoadingMoreData: boolean;
  usersNextUrl: string;
  searchUserSubject = new Subject<string>();
  customer: string;

  constructor(
    private usersService: UsersService,
    private message: NzMessageService,
  ) {}

  init(): void {
    this.loadMoreUsers();
    // this.setupSearch();
  }

  loadMoreUsers(customer?: string): void {
    if(customer == '' || customer == null) return
    this.customer = customer
    this.isLoadingMoreData = true;
    this.usersService.getAll({
        limit: 50,
        url: this.usersNextUrl
      }, {customer}).subscribe((users) => {
      this.usersNextUrl = users.next;
      this.users = [...this.users, ...users.results];
      this.isLoadingMoreData = false;
    });
  }

  searchByName(name: string): void {
    if (name === '') {
      this.usersNextUrl = null;
      this.loadMoreUsers();
    } else {
      // this.searchUserSubject.next(name);
      this.usersService.getAll(
        { limit: 50, url: this.usersNextUrl|| '' },{name, customer:this.customer}  // Usa a URL de next ou uma string vazia se não houver
      ).subscribe((users) => {
        this.usersNextUrl = users.next; // Atualiza a URL da próxima página de resultados
        this.users = users.results;
        this.isLoadingMoreData = false;
      }, (error) => {

        this.message.error('Erro ao carregar os registros. Tente novamente.');
        this.isLoadingMoreData = false;
      });
    }
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
