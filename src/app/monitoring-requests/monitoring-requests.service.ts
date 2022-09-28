import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface MonitoringRequests {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class MonitoringRequestsService implements ApiService<MonitoringRequests> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<MonitoringRequests>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<MonitoringRequests>>('monitoring-requests', { params });
  }

  get(id: string): Observable<MonitoringRequests> {
    return this.http.get<MonitoringRequests>(`monitoring-requests/${id}`);
  }

  save(monitoringRequests: Omit<MonitoringRequests, 'id'>): Observable<MonitoringRequests> {
    return this.http.post<MonitoringRequests>('monitoring-requests/create', monitoringRequests);
  }

  update(
    id: string,
    monitoringRequests: Omit<MonitoringRequests, 'id'>
  ): Observable<MonitoringRequests> {
    return this.http.patch<MonitoringRequests>(`monitoring-requests/${id}/update`, monitoringRequests);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`monitoring-requests/${id}/delete`);
  }
}

