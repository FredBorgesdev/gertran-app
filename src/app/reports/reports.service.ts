import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetAllResponse} from '../shared/services/api.service';
import {MonitoringRequests} from '../monitoring-requests/monitoring-requests.service';

export interface BaseFilter {
  customer: string;
}

export interface BasePeriodFilter extends BaseFilter {
  from: string;
  to: string;
}

export interface DelayedTripFilter extends BaseFilter {
  plate: string;
  point?: string;
  internalCode?: string;
  invoice?: string;
}

export type ReportsResults = MonitoringRequests[];

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getLoadUnloadByPoint(filters: BasePeriodFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/loadunloadbypoint?1=1', { params });
  }

  getDelayedTripes(filters: DelayedTripFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        customer: filters.customer,
        plate: filters.plate,
        point: filters.point,
        internal_code: filters.internalCode,
        invoice: filters.invoice,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/delayedtrips?1=1', { params });
  }

  getMonitoringRequests(filters: BasePeriodFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/requests?1=1', { params });
  }
}
