import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface TravelStep {
  id: string;
  pointId: string;
  address: string;
  latitude: number;
  longitude: number;
  date: string;
  time: string;
  pointType: string;
  state: string;
  city: string;
  zipCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class TravelStepService implements ApiService<TravelStep> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, monitoringRequestId: string): Observable<GetAllResponse<TravelStep>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<TravelStep>>(`monitoring/monitoring-requests/${monitoringRequestId}/travel-steps`, { params });
  }

  get(id: string, monitoringRequestId: string): Observable<TravelStep> {
    return this.http.get<TravelStep>(`monitoring/monitoring-requests/${monitoringRequestId}/travel-steps/${id}`);
  }

  save(travelStep: Partial<TravelStep>, monitoringRequestId: string): Observable<TravelStep> {
    return this.http.post<TravelStep>(`monitoring/monitoring-requests/${monitoringRequestId}/travel-steps/create`, travelStep);
  }

  update(id: string, invoice: Partial<TravelStep>, monitoringRequestId: string): Observable<TravelStep> {
    return this.http.patch<TravelStep>(`monitoring/monitoring-requests/${monitoringRequestId}/travel-steps/${id}/update`, invoice);
  }

  delete(id: string, monitoringRequestId: string): Observable<void> {
    return this.http.delete<void>(`monitoring/monitoring-requests/${monitoringRequestId}/travel-steps/${id}/delete`);
  }
}
