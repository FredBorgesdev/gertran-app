import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Bait {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaitsService implements ApiService<Bait> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, monitoringRequestId: string): Observable<GetAllResponse<Bait>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Bait>>(`monitoring/monitoring-requests/${monitoringRequestId}/baits`, { params });
  }

  get(id: string, monitoringRequestId: string): Observable<Bait> {
    return this.http.get<Bait>(`monitoring/monitoring-requests/${monitoringRequestId}/baits/${id}`);
  }

  save(invoice: Partial<Bait>, monitoringRequestId: string): Observable<Bait> {
    return this.http.post<Bait>(`monitoring/monitoring-requests/${monitoringRequestId}/baits/create`, invoice);
  }

  update(id: string, invoice: Partial<Bait>, monitoringRequestId: string): Observable<Bait> {
    return this.http.patch<Bait>(`monitoring/monitoring-requests/${monitoringRequestId}/baits/${id}/update`, invoice);
  }

  delete(id: string, monitoringRequestId: string): Observable<void> {
    return this.http.delete<void>(`monitoring/monitoring-requests/${monitoringRequestId}/baits/${id}/delete`);
  }
}
