import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../customers/customers.service';

export abstract class AbstractUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password?: string;
  isActive: boolean;
  isAdmin: boolean;
  isSuperuser: boolean;
  isGertranStaff: boolean;
  lastLogin: string;
  permissions: string[];
  groups: number[];
  customer: Customer[];
}

@Injectable({
  providedIn: 'root'
})
export class UsersService implements ApiService<AbstractUser> {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<AbstractUser> {
    return this.http.get<AbstractUser>(`users/${id}`);
  }

  getAll(
    pagination: Pagination,
    filters?: {
      name?: string;
      customer?: string;
      search?: string;
    }
  ): Observable<GetAllResponse<AbstractUser>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.name) {
      params.name = filters.name;
    }
    if (filters?.customer) {
      params.customer = filters.customer;
    }
    if (filters?.search) {
      params.search = filters.search;
    }

    return this.http.get<GetAllResponse<AbstractUser>>('users', { params });
  }

  save(data: AbstractUser): Observable<AbstractUser> {
    return this.http.post<AbstractUser>('users/create', data);
  }

  update(id: string, data: AbstractUser): Observable<AbstractUser> {
    delete data.password;

    return this.http.patch<AbstractUser>(`users/${id}/update`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`users/${id}/delete`);
  }

  changePassword(id: string, password: string): Observable<void> {
    return this.http.patch<void>(`users/${id}/change-password`, { password });
  }

  getByCpf(cpf: string): Observable<AbstractUser> {
    return this.http.get<AbstractUser>(`users/${cpf}/info`);
  }
}
