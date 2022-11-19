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
      terminal?: string,
      customer?: string,
      severity?: Severity
    }
  ): Observable<GetAllResponse<Alert>> {
    const params: any = {
      limit: pagination.limit || DEFAULT_LIMIT,
      alert_type: filters.alertType,
      severity: filters.severity,
    };
    if (filters.terminal) {
      params.terminal = filters.terminal;
    }
    if (filters.customer) {
      params.customer = filters.customer;
    }
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Alert>>('alerts', { params });
  }

  getAlertsCount(
    filters: {
      terminal?: string
      customer?: string
    },
    alertType: AlertTypes,
    severity?: Severity
  ): Observable<AlertCount> {
    const fromObject: any = {
      alert_type: alertType
    };
    if (filters.terminal) {
      fromObject.terminal = filters.terminal;
    }
    if (filters.customer) {
      fromObject.customer = filters.customer;
    }

    const params = new HttpParams({ fromObject });

    return this.http.get<AlertCount>('alerts/count?1=1', { params });
  }

  markAsRead(ids: string[]): Observable<void> {
    return this.http.patch<void>('alerts/mark-as-read', { alerts: ids });
  }

  markAsSolved(id: string, body?: {
    solvedDescription: string,
  }): Observable<void> {
    return this.http.patch<void>(`alerts/${id}/mark-as-solved`, body);
  }
}
