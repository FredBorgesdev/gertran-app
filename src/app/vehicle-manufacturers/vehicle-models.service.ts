import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface VehicleModels {
  id: string;
  name: string;
  vehicleModelType: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleModelsService implements ApiService<VehicleModels> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(
    pagination: Pagination,
    vehicleManufacturerId: string
  ): Observable<GetAllResponse<VehicleModels>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    return this.http.get<GetAllResponse<VehicleModels>>(
      `vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models`,
      { params }
    );
  }

  get(id: string, vehicleManufacturerId: string): Observable<VehicleModels> {
    return this.http.get<VehicleModels>(`vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/${id}`);
  }

  save(
    vehicleModels: Omit<VehicleModels, 'id'>,
    vehicleManufacturerId: string
  ): Observable<VehicleModels> {
    return this.http.post<VehicleModels>(
      `vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/create`,
      vehicleModels
    );
  }

  update(
    id: string,
    vehicleModels: Omit<VehicleModels, 'id'>,
    vehicleManufacturerId: string
  ): Observable<VehicleModels> {
    return this.http.patch<VehicleModels>(
      `vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/${id}/update`,
      vehicleModels
    );
  }

  delete(
    id: string,
    vehicleManufacturerId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `vehicles/manufacturers/${vehicleManufacturerId}/vehicle-models/${id}/delete`
    );
  }
}

