import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
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

  getAll(pagination: Pagination): Observable<GetAllResponse<Group>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Group>>('groups', { params });
  }

  get(id: string): Observable<Group> {
    return this.http.get<Group>(`groups/${id}`);
  }

  save(data: Group): Observable<Group> {
    return this.http.post<Group>('groups/create', data);
  }

  update(id: string, data: Group): Observable<Group> {
    return this.http.patch<Group>(`groups/${id}/update`, data);
  }

  delete(id: string): Observable<Group> {
    return this.http.delete<Group>(`groups/${id}/delete`);
  }
}
