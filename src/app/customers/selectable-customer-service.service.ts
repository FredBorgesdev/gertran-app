import {Injectable} from '@angular/core';
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
  ) {
  }

  init(): void {
    this.loadMoreCustomers();
    this.setupSearch();
  }

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customersService.search({
      limit: 50,
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

  appendCustomer(customer: Customer): void {
    this.customers = [customer, ...this.customers];
  }

  concatCustomers(customers: Customer[]): void {
    this.customers = this.customers.concat(customers);
  }

  private setupSearch(): void {
    this.searchCustomerSubject.pipe(debounceTime(500)).subscribe((search) => {
      this.customersService.search({limit: 50}, search).subscribe((result) => {
        this.customers = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }
}
