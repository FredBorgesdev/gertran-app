import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface Customer {
  checklistExpirationPeriod: string;
  canSelectShipper: boolean;
  id: string;
  corporateName: string;
  tradingName: string;
  cnpj: string;
  seller: string | null;
  domain: string | null;
  permissions?: number[];

  // address

  zipCode: string;
  street: string;
  complement: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  shippers: {
    id: string;
    corporateName: string;
    tradingName: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ApiService<Customer> {

  constructor(
    private http: HttpClient
  ) { }

  save(customer: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<Customer>('customers/create', customer);
  }

  getAll(
    pagination: Pagination,
    filters?: {
      name?: string;
      isShipper?: boolean;
    }): Observable<GetAllResponse<Customer>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.name) {
      params.name = filters.name;
    }
    if (filters?.isShipper) {
      params.is_shipper = filters.isShipper;
    }

    return this.http.get<GetAllResponse<Customer>>('customers', { params });
  }

  get(id: string): Observable<Customer> {
    return this.http.get<Customer>(`customers/${id}`);
  }

  update(id: string, customer: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.patch<Customer>(`customers/${id}/update`, customer);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`customers/${id}/delete`);
  }
}
