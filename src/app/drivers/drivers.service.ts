import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable, of} from 'rxjs';
import {Customer} from '../customers/customers.service';

export interface Driver {
  phoneNumber?: string;
  id: string;
  customers: Customer[];
  workingSituation: string;
  name: string;
  rg: string;
  cpf: string;
  cnhNumber: string;
  cnhCategory: string;
  cnhValidity: string;
  cnhIssuer: string;
  cnhIssuerUf: string;
  cnhFirstIssue: string;
  cnhEmission: string;
  admissionDate: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DriversService implements ApiService<Driver> {

  constructor(private http: HttpClient) { }

  getAll(
    pagination: Pagination,
    filters?: {
      customer?: string;
      search?: string;
    }
  ): Observable<GetAllResponse<Driver>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.customer) {
      params.customer = filters.customer;
    }
    if (filters?.search) {
      params.search = filters.search;
    }

    return this.http.get<GetAllResponse<Driver>>('drivers', { params });
  }

  get(id: string): Observable<Driver> {
    return this.http.get<Driver>(`drivers/${id}`);
  }

  save(body: Omit<Driver, 'id'>): Observable<Driver> {
    return this.http.post<Driver>('drivers/create', this.getBody(body));
  }

  update(id: string, body: Omit<Driver, 'id'>): Observable<Driver> {
    return this.http.patch<Driver>(`drivers/${id}/update`, this.getBody(body));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`drivers/${id}/delete`);
  }

  getWorkingSituations(): Observable<Choice[]> {
    return of([
      { value: 'fleet', label: 'Frota' },
      { value: 'aggregate', label: 'Agregado' },
      { value: 'third_party', label: 'Terceirizado' },
    ]);
  }

  private getBody(body: Omit<Driver, 'id'>): Omit<Driver, 'id'> {
    return {
      ...this.parseDatesToYearMonthDay(body),
      cpf: this.removeSpecialCharactersFromCpf(body),
    };
  }

  private parseDatesToYearMonthDay(body: Omit<Driver, 'id'>): Omit<Driver, 'id'> {
    const bodyCopy = { ...body };
    const dateFields = ['cnhValidity', 'cnhFirstIssue', 'cnhEmission', 'admissionDate'];
    dateFields.forEach((field) => {
      if (bodyCopy[field]) {
        bodyCopy[field] = new Date(bodyCopy[field]).toISOString().split('T')[0];
      }
    });

    return bodyCopy;
  }

  private removeSpecialCharactersFromCpf(body: Omit<Driver, 'id'>): string {
    return body.cpf.replace(/\D/g, '');
  }
}
