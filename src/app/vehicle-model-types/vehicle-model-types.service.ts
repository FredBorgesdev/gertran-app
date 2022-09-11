import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';

export interface VehicleModelTypes {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class VehicleModelTypesService implements ApiService<VehicleModelTypes> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination) {
    const params = { limit: DEFAULT_LIMIT }
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value 
      }) 
    }

    return this.http.get<GetAllResponse<VehicleModelTypes>>('vehicles/vehicle-model-types', { params });
  }

  get(id: string) {
    return this.http.get<VehicleModelTypes>(`vehicles/vehicle-model-types/${id}`);
  }

  save(vehicleModelTypes: Omit<VehicleModelTypes, 'id'>) {
    return this.http.post<VehicleModelTypes>('vehicles/vehicle-model-types/create', vehicleModelTypes);
  }

  update(
    id: string,
    vehicleModelTypes: Omit<VehicleModelTypes, 'id'>
  ) {
    return this.http.patch<VehicleModelTypes>(`vehicles/vehicle-model-types/${id}/update`, vehicleModelTypes);
  }

  delete(id: string) {
    return this.http.delete<VehicleModelTypes>(`vehicles/vehicle-model-types/${id}/delete`);
  }
}

