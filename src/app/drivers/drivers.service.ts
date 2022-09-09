import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface Driver {
  id: string;
	customer: string;
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

  getAll() {
    return this.http.get<Driver[]>('drivers');
  }

  get(id: string) {
    return this.http.get<Driver>(`drivers/${id}`);
  }

  save(body: Omit<Driver, 'id'>) {
    return this.http.post<Driver>('drivers/create', this.getBody(body));
  }

  update(id: string, body: Omit<Driver, 'id'>) {
    return this.http.patch<Driver>(`drivers/${id}/update`, this.getBody(body));
  }

  delete(id: string) {
    return this.http.delete<Driver>(`drivers/${id}/delete`);
  }

  private getBody(body: Omit<Driver, 'id'>) {
    return {
      ...this.parseDatesToYearMonthDay(body),
      cpf: this.removeSpecialCharactersFromCpf(body),
    };
  }

  private parseDatesToYearMonthDay(body: Omit<Driver, 'id'>) {
    const bodyCopy = { ...body };
    const dateFields = ['cnhValidity', 'cnhFirstIssue', 'cnhEmission', 'admissionDate'];
    dateFields.forEach((field) => {
      if (bodyCopy[field]) {
        bodyCopy[field] = new Date(bodyCopy[field]).toISOString().split('T')[0];
      }
    });

    return bodyCopy;
  }

  private removeSpecialCharactersFromCpf(body: Omit<Driver, 'id'>) {
    return body.cpf.replace(/\D/g, '');
  }
}
