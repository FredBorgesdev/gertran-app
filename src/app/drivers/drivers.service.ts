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
    return this.http.post<Driver>('drivers/create', body);
  }

  update(id: string, body: Omit<Driver, 'id'>) {
    return this.http.patch<Driver>(`drivers/${id}/update`, body);
  }

  delete(id: string) {
    return this.http.delete<Driver>(`drivers/${id}/delete`);
  }
}
