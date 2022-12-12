import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import ApiService, { Choice, GetAllResponse, Pagination } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService<T> implements ApiService<T> {

  constructor(protected http: HttpClient) { }

  getAll(pagination: Pagination, ...params): Observable<GetAllResponse<T>> {
    throw new Error('Method not implemented.');
  }

  getByPlate(plate: string): Observable<T> {
    throw new Error('Method not implemented.');
  }

  update(id: string, data: T, ...params): Observable<T> {
    throw new Error('Method not implemented.');
  }

  get(id: string, ...params): Observable<T> {
    throw new Error('Method not implemented.');
  }

  save(data: T, ...params): Observable<T> {
    throw new Error('Method not implemented.');
  }

  delete(id: string, ...params): Observable<void> {
    throw new Error('Method not implemented.');
  }

  getWorkingSituations(): Observable<Choice[]> {
    return this.http.get<Choice[]>('vehicles/working-situations');
  }

  getChargingMethods(): Observable<Choice[]> {
    return this.http.get<Choice[]>('vehicles/charging-methods');
  }
}
