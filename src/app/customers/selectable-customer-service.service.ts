import { Injectable } from '@angular/core';
import {Customer, CustomersService} from './customers.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class SelectableCustomerServiceService {
  customers: Customer[] = [];
  isLoadingMoreData: boolean;
  customersNextUrl: string;
  searchCustomerSubject = new Subject<string>();

  constructor(
    private customersService: CustomersService,
    private message: NzMessageService,
  ) {}

  init(): void {
    this.loadMoreCustomers();
    this.setupSearch();
  }

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customersService.getAll({
      limit: 999,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
    });
  }

  searchByName(name: string): void {
    if (name === '') {
      this.customersNextUrl = null;
      this.loadMoreCustomers();
    } else {
      this.searchCustomerSubject.next(name);
    }
  }

  private setupSearch(): void {
    this.searchCustomerSubject.pipe(debounceTime(500)).subscribe((name) => {
      this.customersService.getAll({ limit: 999 }, { name }).subscribe((result) => {
        this.customers = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }
}
