import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private http: HttpClient) { }

  getAlertsCount(alertType: AlertTypes, severity?: Severity): Observable<AlertCount> {
    const params = new HttpParams({
      fromObject: {
        alert_type: alertType,
      }
    });

    return this.http.get<AlertCount>('alerts/count?1=1', { params });
  }
}
