import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  DEFAULT_LIMIT,
  GetAllResponse,
  Pagination,
} from '../shared/services/api.service';

export enum AlertTypes {
  vehicle = 'vehicle',
  terminal = 'terminal',
  customer = 'customer',
  system = 'system',
}

export type SeverityFlat = 'info' | 'danger' | 'warning';

export enum Severity {
  info = 'info',
  danger = 'danger',
  warning = 'warning',
}

export type AlertCount = {
  [key in Severity]: number;
};

export interface MonitoringRequestReleasedAlerts {
  id: string;
  plate: string;
  userReleasedMonitoring: string;
  customerName: string;
}

export type Alert = {
  lastEvent: string | null;
  id: string;
  message: string;
  monitoringRequest: number | null;
  position: {
    positionInfo: {
      observation: string;
      destinyCity: string;
      destinyState: string;
      originCity: string;
      originState: string;
    };
    truck: {
      id: string;
      observations: string;
    };
    monitoringRequest: {
      truck: {
        id: string;
        vehicle: {
          description: string;
        };
      };
      id: string;
    };
  };
  readAt: Date | null;
  severity: Severity;
  solvedAt: Date | null;
  solvedBy: string | null;
  solvedDescription: string | null;
  type: AlertTypes;
  vehicle: {
    id: string;
    plate: string;
  } | null;
  receivedAt: string | null;
  customer: {
    tradingName: string;
    corporateName: string;
  }
};

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private http: HttpClient) {
  }

  markMonitoringRequestReleasedAlertAsRead(alertId: string): Observable<void> {
    return this.http.patch<void>(`monitoring/monitoring-requests-released-alerts/read-released-alert`, { id: alertId });
  }

  getMonitoringRequesReleasedtAlerts(
    pagination: Pagination,
    filters: {
      terminal?: string;
      read_alert?: boolean
    }
  ): Observable<GetAllResponse<MonitoringRequestReleasedAlerts>> {  
    const params: any = {
      limit: pagination.limit || DEFAULT_LIMIT,
    };
    if (filters.terminal) {
      params.terminal = filters.terminal;
    }

    if(filters.read_alert){
      params.read_alert = filters.read_alert
    }

    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    return this.http.get<GetAllResponse<MonitoringRequestReleasedAlerts>>('monitoring/monitoring-requests-released-alerts', {params});
  }

  getAlerts(
    pagination: Pagination,
    filters: {
      alertType: AlertTypes;
      terminal?: string;
      customer?: string;
      monitoring_request?: string;
      severity?: SeverityFlat;
      alertsOnly?: boolean;
    }
  ): Observable<GetAllResponse<Alert>> {
    if(window.location.pathname == '/reports/dashboards/tc-gertran')
      pagination.limit = 4

    const params: any = {
      limit: pagination.limit || DEFAULT_LIMIT,
      alert_type: filters.alertType,
    };
    if (filters.terminal) {
      params.terminal = filters.terminal;
    }
    if (filters.customer) {
      params.customer = filters.customer;
    }
    if (filters?.severity) {
      params.severity = filters.severity;
    }
    if (filters?.alertsOnly) {
      params.alerts_only = filters.alertsOnly;
    }
    if (filters?.monitoring_request) {
      params.monitoring_request = filters.monitoring_request;
    }
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Alert>>('alerts', {params});
  }

  getAlertsCount(
    filters: {
      terminal?: string;
      customer?: string;
    },
    alertType: AlertTypes,
    severity?: Severity
  ): Observable<AlertCount> {
    const fromObject: any = {
      alert_type: alertType,
    };
    if (filters.terminal) {
      fromObject.terminal = filters.terminal;
    }
    if (filters.customer) {
      fromObject.customer = filters.customer;
    }

    const params = new HttpParams({fromObject});

    return this.http.get<AlertCount>('alerts/count?1=1', {params});
  }

  markAsRead(ids: string[]): Observable<void> {
    return this.http.patch<void>('alerts/mark-as-read', {alerts: ids});
  }

  markAsSolved(
    id: string,
    body?: {
      solvedDescription: string;
    }
  ): Observable<void> {
    return this.http.patch<void>(`alerts/${id}/mark-as-solved`, body);
  }
}
