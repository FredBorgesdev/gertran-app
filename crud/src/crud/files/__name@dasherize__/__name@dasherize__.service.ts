import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface <%= classify(name) %> {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service implements ApiService<<%= classify(name) %>> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination): GetAllResponse<<%= classify(name) %>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<<%= classify(name) %>>>('<%= dasherize(name) %>', { params });
  }

  get(id: string): Observable<<%= classify(name) %>> {
    return this.http.get<<%= classify(name) %>>(`<%= dasherize(name) %>/${id}`);
  }

  save(<%= camelize(name) %>: Omit<<%= classify(name) %>, 'id'>): Observable<<%= classify(name) %>> {
    return this.http.post<<%= classify(name) %>>('<%= dasherize(name) %>/create', <%= camelize(name) %>);
  }

  update(
    id: string,
    <%= camelize(name) %>: Omit<<%= classify(name) %>, 'id'>
  ): Observable<<%= classify(name) %>> {
    return this.http.patch<<%= classify(name) %>>(`<%= dasherize(name) %>/${id}/update`, <%= camelize(name) %>);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`<%= dasherize(name) %>/${id}/delete`);
  }
}

