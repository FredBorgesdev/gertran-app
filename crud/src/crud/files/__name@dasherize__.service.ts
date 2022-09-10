import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

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

  getAll() {
    return this.http.get<<%= classify(name) %>[]>('<%= dasherize(name) %>');
  }

  get(id: string) {
    return this.http.get<<%= classify(name) %>>(`<%= dasherize(name) %>/${id}`);
  }

  save(<%= camelize(name) %>: Omit<<%= classify(name) %>, 'id'>) {
    return this.http.post<<%= classify(name) %>>('<%= dasherize(name) %>/create', <%= camelize(name) %>);
  }

  update(
    id: string,
    <%= camelize(name) %>: Omit<<%= classify(name) %>, 'id'>
  ) {
    return this.http.patch<<%= classify(name) %>>(`<%= dasherize(name) %>/${id}/update`, <%= camelize(name) %>);
  }

  delete(id: string) {
    return this.http.delete<<%= classify(name) %>>(`<%= dasherize(name) %>/${id}/delete`);
  }
}

