import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';

export interface VehicleManufacturers {
  id: string;
  name: string;
  makesTrucks: boolean;
  makesWagons: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleManufacturersService implements ApiService<VehicleManufacturers> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination) {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<VehicleManufacturers>>('vehicles/manufacturers', { params });
  }

  get(id: string) {
    return this.http.get<VehicleManufacturers>(`vehicles/manufacturers/${id}`);
  }

  save(vehicleManufacturers: Omit<VehicleManufacturers, 'id'>) {
    return this.http.post<VehicleManufacturers>('vehicles/manufacturers/create', vehicleManufacturers);
  }

  update(
    id: string,
    vehicleManufacturers: Omit<VehicleManufacturers, 'id'>
  ) {
    return this.http.patch<VehicleManufacturers>(`vehicles/manufacturers/${id}/update`, vehicleManufacturers);
  }

  delete(id: string) {
    return this.http.delete<VehicleManufacturers>(`vehicles/manufacturers/${id}/delete`);
  }
}

