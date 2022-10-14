import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TerminalGroups} from './terminal-groups.service';
import {Customer} from '../customers/customers.service';
import {Truck} from '../trucks/trucks.service';

export interface Terminals {
  id: string;
  name: string;
  description: string;
  terminalGroup: TerminalGroups | string;
  customer: Customer | string;
  vehicles: string[] | Truck['vehicle'][];
}

@Injectable({
  providedIn: 'root'
})
export class TerminalsService implements ApiService<Terminals> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<Terminals>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Terminals>>('settings/terminals', { params });
  }

  get(id: string): Observable<Terminals> {
    return this.http.get<Terminals>(`settings/terminals/${id}`);
  }

  save(terminals: Omit<Terminals, 'id'>): Observable<Terminals> {
    return this.http.post<Terminals>('settings/terminals/create', terminals);
  }

  update(id: string, terminals: Omit<Terminals, 'id'>): Observable<Terminals> {
    return this.http.patch<Terminals>(`settings/terminals/${id}/update`, terminals);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/terminals/${id}/delete`);
  }
}
