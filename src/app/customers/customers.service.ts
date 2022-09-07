import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import ApiService from '../shared/services/api.service';
import camelcaseKeys from 'camelcase-keys-deep';

export interface Customer {
  id: string
  corporateName: string
  tradingName: string
  cnpj: string
  seller: string | null
  domain: string | null
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ApiService<Customer> {

  constructor(
    private http: HttpClient
  ) { }

  save(customer: Omit<Customer, 'id'>) {
    return this.http.post<Customer>('customers/create', customer);
  }

  getAll() {
    return this.http.get<Customer[]>('customers').pipe(
      map(customers => customers.map<Customer>(camelcaseKeys))
    );
  }

  get(id: string) {
    return this.http.get<Customer>(`customers/${id}`);
  }

  update(id: string, customer: Omit<Customer, 'id'>) {
    return this.http.patch<Customer>(`customers/${id}/update`, customer);
  }

  delete(id: string) {
    return this.http.delete<Customer>(`customers/${id}/delete`);
  }
}
