import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface VehiclePeripherals {
  id: string;
  name: string;
  peripheralType: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehiclePeripheralsService implements ApiService<VehiclePeripherals> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<VehiclePeripherals>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<VehiclePeripherals>>('vehicles/peripherals', { params });
  }

  get(id: string): Observable<VehiclePeripherals> {
    return this.http.get<VehiclePeripherals>(`vehicles/peripherals/${id}`);
  }

  save(vehiclePeripherals: Omit<VehiclePeripherals, 'id'>): Observable<VehiclePeripherals> {
    return this.http.post<VehiclePeripherals>('vehicles/peripherals/create', vehiclePeripherals);
  }

  update(
    id: string,
    vehiclePeripherals: Omit<VehiclePeripherals, 'id'>
  ): Observable<VehiclePeripherals> {
    return this.http.patch<VehiclePeripherals>(`vehicles/peripherals/${id}/update`, vehiclePeripherals);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`vehicles/peripherals/${id}/delete`);
  }
}

