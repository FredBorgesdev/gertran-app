import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';
import {Workday} from '../workdays/workday.service';

export interface Customer {
  closingDay: number;
  checklistExpirationPeriod: string;
  canSelectShipper: boolean;
  id: string;
  corporateName: string;
  tradingName: string;
  cnpj: string;
  seller: string | null;
  email: string | null;
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
  workdaySettings: Workday;
  hasApiIntegration: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ApiService<Customer> {

  constructor(
    private http: HttpClient
  ) {
  }

  save(customer: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<Customer>('customers/create', customer);
  }

  getAll(
    pagination: Pagination,
    filters?: {
      isShipper?: boolean;
      search?: string;
    }): Observable<GetAllResponse<Customer>> {
    const params = this.getAllParams(pagination, filters);

    return this.http.get<GetAllResponse<Customer>>('customers', {params});
  }

  search(pagination: Pagination, search?: string): Observable<GetAllResponse<Customer>> {
    const params = this.getAllParams(pagination, {search});

    return this.http.get<GetAllResponse<Customer>>(`customers/search`, {params});
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

  private getAllParams(pagination: Pagination, filters?: {
    isShipper?: boolean;
    search?: string;
  }): any {
    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.search) {
      params.search = filters.search;
    }
    if (filters?.isShipper) {
      params.is_shipper = filters.isShipper;
    }
    return params;
  }
}
