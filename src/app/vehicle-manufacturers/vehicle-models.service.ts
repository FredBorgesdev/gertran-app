import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface VehicleModels {
  id: string
  name: string
  vehicleModelType: string
}

@Injectable({
  providedIn: 'root'
})
export class VehicleModelsService implements ApiService<VehicleModels> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(vehicleManufacturerId: string) {
    return this.http.get<VehicleModels[]>(`vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models`);
  }

  get(id: string, vehicleManufacturerId: string) {
    return this.http.get<VehicleModels>(`vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/${id}`);
  }

  save(
    vehicleModels: Omit<VehicleModels, 'id'>,
    vehicleManufacturerId: string
  ) {
    return this.http.post<VehicleModels>(
      `vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/create`,
      vehicleModels
    );
  }

  update(
    id: string,
    vehicleModels: Omit<VehicleModels, 'id'>,
    vehicleManufacturerId: string
  ) {
    return this.http.patch<VehicleModels>(
      `vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/${id}/update`,
      vehicleModels
    );
  }

  delete(id: string, vehicleManufacturerId: string) {
    return this.http.delete<VehicleModels>(`vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/${id}/delete`);
  }
}

