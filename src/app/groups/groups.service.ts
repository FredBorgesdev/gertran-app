import { Injectable } from '@angular/core';
import ApiService, {GetAllResponse} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Group {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService implements ApiService<Group> {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GetAllResponse<Group>> {
    return this.http.get<GetAllResponse<Group>>('/groups');
  }

  get(id: string): Observable<Group> {
    return this.http.get<Group>(`/groups/${id}`);
  }

  save(data: Group): Observable<Group> {
    return this.http.post<Group>('/groups/create', data);
  }

  update(id: string, data: Group): Observable<Group> {
    return this.http.patch<Group>(`/groups/${id}/update`, data);
  }

  delete(id: string): Observable<Group> {
    return this.http.delete<Group>(`/groups/${id}/delete`);
  }
}
