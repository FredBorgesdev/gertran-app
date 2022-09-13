import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';

export interface Customer {
  id: string;
  corporateName: string;
  tradingName: string;
  cnpj: string;
  seller: string | null;
  domain: string | null;

  // address

  zipCode: string;
  street: string;
  complement: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
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

  getAll(pagination: Pagination) {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Customer>>('customers', { params });
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
