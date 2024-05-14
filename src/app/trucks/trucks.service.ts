import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from '../vehicles/vehicles-form/vehicles-form.component';
import {VehiclesService} from '../vehicles/vehicles.service';

export interface Truck extends Vehicle {
  chargingMethod: string;
  numberOfAxles: number;
  cubage: number;
  vehicle: Vehicle;
}

@Injectable({
  providedIn: 'root'
})
export class TrucksService extends VehiclesService<Truck> {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(
    pagination: Pagination,
    filters?: { customerId?: string, plate?: string },
  ): Observable<GetAllResponse<Truck>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.customerId) {
      params.customer = filters.customerId;
    }
    if (filters?.plate) {
      params.plate = filters.plate;
    }
    if(window.location.pathname.includes('customers/customers')
    ){
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split('/');
      const uuid = urlParts[urlParts.length - 1];
      params.customer = uuid;
    }

    return this.http.get<GetAllResponse<Truck>>('vehicles/trucks', { params });
  }

  getByPlate(plate: string): Observable<Truck> {
    return this.http.get<Truck>(`vehicles/trucks/${plate}/info`);
  }

  get(id: string): Observable<Truck> {
    return this.http.get<Truck>(`vehicles/trucks/${id}`);
  }

  save(truck: Omit<Truck, 'id'>): Observable<Truck> {
    return this.http.post<Truck>('vehicles/trucks/create', truck);
  }

  update(id: string, truck: Omit<Truck, 'id'>): Observable<Truck> {
    return this.http.patch<Truck>(`vehicles/trucks/${id}/update`, truck);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`vehicles/trucks/${id}/delete`);
  }
}
