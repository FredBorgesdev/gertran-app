import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface VehicleManufacturers {
  id: string
  name: string
  makesTrucks: boolean
  makesWagons: boolean
}

@Injectable({
  providedIn: 'root'
})
export class VehicleManufacturersService implements ApiService<VehicleManufacturers> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<VehicleManufacturers[]>('vehicles/manufacturers');
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

