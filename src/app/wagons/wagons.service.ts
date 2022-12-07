import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from '../vehicles/vehicles-form/vehicles-form.component';
import {VehiclesService} from '../vehicles/vehicles.service';

export interface Wagon extends Vehicle {
  vehicle: Vehicle;
}

@Injectable({
  providedIn: 'root'
})
export class WagonsService extends VehiclesService<Wagon> {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(
    pagination: Pagination,
    filters?: {
      customer?: string;
    }
  ): Observable<GetAllResponse<Wagon>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.customer) {
      params.customer = filters.customer;
    }

    return this.http.get<GetAllResponse<Wagon>>('vehicles/wagons', { params });
  }

  get(id: string): Observable<Wagon> {
    return this.http.get<Wagon>(`vehicles/wagons/${id}`);
  }

  save(wagon: Omit<Wagon, 'id'>): Observable<Wagon> {
    return this.http.post<Wagon>('vehicles/wagons/create', wagon);
  }

  update(id: string, wagon: Omit<Wagon, 'id'>): Observable<Wagon> {
    return this.http.patch<Wagon>(`vehicles/wagons/${id}/update`, wagon);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`vehicles/wagons/${id}/delete`);
  }
}
