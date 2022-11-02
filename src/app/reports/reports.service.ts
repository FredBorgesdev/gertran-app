import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetAllResponse} from '../shared/services/api.service';
import {MonitoringRequests} from '../monitoring-requests/monitoring-requests.service';

export interface BaseFilter {
  customer: string;
  from: string;
  to: string;
}

export type ReportsResults = MonitoringRequests[];

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getLoadUnloadByPoint(filters: BaseFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
        limit: 99
      }
    });
    return this.http.get<ReportsResults>('reports/loadunloadbypoint?1=1', { params });
  }
}
