import { Injectable } from '@angular/core';
import ApiService, { GetAllResponse } from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  cellphone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService implements ApiService<User> {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<User> {
    return this.http.get<User>(`users/${id}`);
  }

  getAll(): Observable<GetAllResponse<User>> {
    return this.http.get<GetAllResponse<User>>('users');
  }

  save(data: User): Observable<User> {
    return this.http.post<User>('users/create', data);
  }

  update(id: string, data: User): Observable<User> {
    return this.http.put<User>(`users/${id}/update`, data);
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`users/${id}/delete`);
  }
}
