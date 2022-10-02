import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface LoadingOrders {
  id: string;
  ocrNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingOrdersService implements ApiService<LoadingOrders> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination, monitoringRequestId: string): Observable<GetAllResponse<LoadingOrders>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<LoadingOrders>>(`monitoring/monitoring-requests/${monitoringRequestId}/loading-orders`, { params });
  }

  get(id: string, monitoringRequestId: string): Observable<LoadingOrders> {
    return this.http.get<LoadingOrders>(`monitoring/monitoring-requests/${monitoringRequestId}/loading-orders/${id}`);
  }

  save(loadingOrders: Partial<LoadingOrders>, monitoringRequestId: string): Observable<LoadingOrders> {
    return this.http.post<LoadingOrders>(`monitoring/monitoring-requests/${monitoringRequestId}/loading-orders/create`, loadingOrders);
  }

  update(
    id: string,
    loadingOrders: Partial<LoadingOrders>,
    monitoringRequestId: string,
  ): Observable<LoadingOrders> {
    return this.http.put<LoadingOrders>(`monitoring/monitoring-requests/${monitoringRequestId}/loading-orders/${id}`, loadingOrders);
  }

  delete(
    id: string,
    monitoringRequestId: string,
  ): Observable<void> {
    return this.http.delete<void>(`monitoring/monitoring-requests/${monitoringRequestId}/loading-orders/${id}`);
  }
}
