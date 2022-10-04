import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ArmedGuard {
  id: string;
  technology: string;
  serialNumber: string;
  plate: string;
  contact: string;
  firstAgent: string;
  secondAgent: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArmedGuardService implements ApiService<ArmedGuard> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, monitoringRequestId: string): Observable<GetAllResponse<ArmedGuard>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<ArmedGuard>>(`monitoring/monitoring-requests/${monitoringRequestId}/armed-guards`, { params });
  }

  get(id: string, monitoringRequestId: string): Observable<ArmedGuard> {
    return this.http.get<ArmedGuard>(`monitoring/monitoring-requests/${monitoringRequestId}/armed-guards/${id}`);
  }

  save(invoice: Partial<ArmedGuard>, monitoringRequestId: string): Observable<ArmedGuard> {
    return this.http.post<ArmedGuard>(`monitoring/monitoring-requests/${monitoringRequestId}/armed-guards/create`, invoice);
  }

  update(id: string, invoice: Partial<ArmedGuard>, monitoringRequestId: string): Observable<ArmedGuard> {
    return this.http.patch<ArmedGuard>(`monitoring/monitoring-requests/${monitoringRequestId}/armed-guards/${id}/update`, invoice);
  }

  delete(id: string, monitoringRequestId: string): Observable<void> {
    return this.http.delete<void>(`monitoring/monitoring-requests/${monitoringRequestId}/armed-guards/${id}/delete`);
  }
}
