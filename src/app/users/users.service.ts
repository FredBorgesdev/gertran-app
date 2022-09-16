import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User {
  id: string;
  email: string;
  isActive: string;
  isAdmin: string;
  isSuperuser: string;
  lastLogin: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService implements ApiService<User> {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<User> {
    return this.http.get<User>(`users/${id}`);
  }

  getAll(pagination: Pagination): Observable<GetAllResponse<User>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<User>>('users', { params });
  }

  save(data: User): Observable<User> {
    return this.http.post<User>('users/create', data);
  }

  update(id: string, data: User): Observable<User> {
    return this.http.patch<User>(`users/${id}/update`, data);
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`users/${id}/delete`);
  }

  changePassword(id: string, password: string): Observable<void> {
    return this.http.patch<void>(`users/${id}/change-password`, { password });
  }
}
