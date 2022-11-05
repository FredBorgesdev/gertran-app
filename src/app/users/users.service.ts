import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  isActive: string;
  isAdmin: string;
  isSuperuser: string;
  lastLogin: string;
  permissions: number[];
  groups: number[];
}

@Injectable({
  providedIn: 'root'
})
export class UsersService implements ApiService<User> {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<User> {
    return this.http.get<User>(`users/${id}`);
  }

  getAll(pagination: Pagination, filters?: { name?: string }): Observable<GetAllResponse<User>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.name) {
      params.name = filters.name;
    }

    return this.http.get<GetAllResponse<User>>('users', { params });
  }

  save(data: User): Observable<User> {
    return this.http.post<User>('users/create', data);
  }

  update(id: string, data: User): Observable<User> {
    delete data.password;

    return this.http.patch<User>(`users/${id}/update`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`users/${id}/delete`);
  }

  changePassword(id: string, password: string): Observable<void> {
    return this.http.patch<void>(`users/${id}/change-password`, { password });
  }
}
