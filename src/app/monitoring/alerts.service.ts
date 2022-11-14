import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';

export enum AlertTypes {
  vehicle = 'vehicle',
  terminal = 'terminal',
  customer = 'customer',
  system = 'system',
}

export enum Severity {
  info = 'info',
  danger = 'danger',
  warning = 'warning',
}

export type AlertCount = {
  [key in Severity]: number;
};

export type Alert = {
  id: string;
  message: string;
  monitoringRequest: number | null;
  position: number | null;
  readAt: Date | null;
  severity: Severity;
  solvedAt: Date | null;
  solvedBy: string | null;
  solvedDescription: string | null;
  type: AlertTypes;
  vehicle: number | null;
};

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private http: HttpClient) { }

  getAlerts(
    pagination: Pagination,
    filters: {
      alertType: AlertTypes,
      severity?: Severity
    }
  ): Observable<GetAllResponse<Alert>> {
    const params = {
      limit: pagination.limit || DEFAULT_LIMIT,
      alert_type: filters.alertType,
      severity: filters.severity,
    };
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Alert>>('alerts', { params });
  }

  getAlertsCount(alertType: AlertTypes, severity?: Severity): Observable<AlertCount> {
    const params = new HttpParams({
      fromObject: {
        alert_type: alertType,
      }
    });

    return this.http.get<AlertCount>('alerts/count?1=1', { params });
  }
}
