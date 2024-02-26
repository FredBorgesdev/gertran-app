import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface MonitoringRequestVerifyingLast72HReleased {
  id: string;
  truck: Truck;
  customer: Customer
}

interface Truck {
  id: string;
}

interface Customer {
  id: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReleasedByCustomersService{

  constructor(private http: HttpClient) { }

  releaseByCustomer(
    ids: string[]
  ): Observable<MonitoringRequestVerifyingLast72HReleased[]> {
    return this.http.post<MonitoringRequestVerifyingLast72HReleased[]>(`monitoring/monitoring-requests/get-list-released-by-id-customers`, ids);
  }
}