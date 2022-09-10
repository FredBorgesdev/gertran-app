import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface VehiclePeripherals {
  id: string
  name: string
  peripheralType: string
}

@Injectable({
  providedIn: 'root'
})
export class VehiclePeripheralsService implements ApiService<VehiclePeripherals> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<VehiclePeripherals[]>('vehicles/peripherals');
  }

  get(id: string) {
    return this.http.get<VehiclePeripherals>(`vehicles/peripherals/${id}`);
  }

  save(vehiclePeripherals: Omit<VehiclePeripherals, 'id'>) {
    return this.http.post<VehiclePeripherals>('vehicles/peripherals/create', vehiclePeripherals);
  }

  update(
    id: string,
    vehiclePeripherals: Omit<VehiclePeripherals, 'id'>
  ) {
    return this.http.patch<VehiclePeripherals>(`vehicles/peripherals/${id}/update`, vehiclePeripherals);
  }

  delete(id: string) {
    return this.http.delete<VehiclePeripherals>(`vehicles/peripherals/${id}/delete`);
  }
}

