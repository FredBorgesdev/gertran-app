import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../customers/customers.service';

export interface TerminalGroups {
  id: string;
  customer: Customer | string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TerminalGroupsService implements ApiService<TerminalGroups> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<TerminalGroups>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<TerminalGroups>>('settings/terminal-groups', { params });
  }

  get(id: string): Observable<TerminalGroups> {
    return this.http.get<TerminalGroups>(`settings/terminal-groups/${id}`);
  }

  save(terminalGroups: Omit<TerminalGroups, 'id'>): Observable<TerminalGroups> {
    return this.http.post<TerminalGroups>('settings/terminal-groups/create', terminalGroups);
  }

  update(id: string, terminalGroups: Omit<TerminalGroups, 'id'>): Observable<TerminalGroups> {
    return this.http.patch<TerminalGroups>(`settings/terminal-groups/${id}/update`, terminalGroups);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/terminal-groups/${id}/delete`);
  }
}
