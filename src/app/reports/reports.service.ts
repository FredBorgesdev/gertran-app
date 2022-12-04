import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetAllResponse} from '../shared/services/api.service';
import {MonitoringRequests} from '../monitoring-requests/monitoring-requests.service';
import {AbstractUser} from '../users/users.service';
import {Position} from '../monitoring/positions.service';

export interface BaseFilter {
  customer: string;
}

export interface BasePeriodFilter extends BaseFilter {
  from: string;
  to: string;
}

export interface BaseUserFilter extends BasePeriodFilter {
  user: string;
}

export interface BaseVehicleFilter extends BasePeriodFilter {
  plate: string;
}

export interface BaseMacroFilter extends BaseVehicleFilter {
  type?: string;
}

export interface DelayedTripFilter extends BaseFilter {
  plate: string;
  point?: string;
  internalCode?: string;
  invoice?: string;
}

export type ReportsResults = MonitoringRequests[];

export type CommandSentHistory = {
  apiReturn: any;
  code: string;
  commandParams: any;
  createdAt: string;
  deletedByCascade: boolean;
  id: string;
  observations: string;
  receivedAt: string;
  sentAt: string;
  sentByUser: AbstractUser;
  solvedAt: string;
  solvedByUser: AbstractUser;
  status: string;
  vehicleTracker: string;
};

export type PositionEvent = {
  eventCode: string;
  eventDescription: string;
  eventName: string;
  eventProcessed: boolean;
  eventType: string;
  id: string;
  createdAt: string;
  position: {
    vehicle: {
      id: string;
      plate: string;
    }
  }
};

export type MonitoringRequestBait = MonitoringRequests & {
  installationLocation: string;
  technology: string;
  serialNumber: string;
};

export type MacroVehicleReport = {
  id: string;
  direction: string;
  datetime: string;
  message: string;
  sentBy: string;
  status: string;
  title: string;
};

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

  getVehiclesReleased(filters: BasePeriodFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/vehiclesreleased?1=1', { params });
  }

  getClosure(filters: BasePeriodFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/closure?1=1', { params });
  }

  getTravelStart(filters: BaseVehicleFilter): Observable<PositionEvent[]> {
    const filtersParams: any = {
      from_date: filters.from,
      to_date: filters.to,
      customer: filters.customer,
    };
    if (filters.plate) {
      filtersParams.plate = filters.plate;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });
    return this.http.get<PositionEvent[]>('reports/monitoring/travelstart?1=1', { params });
  }

  getTravelEnd(filters: BaseVehicleFilter): Observable<PositionEvent[]> {
    const filtersParams: any = {
      from_date: filters.from,
      to_date: filters.to,
      customer: filters.customer,
    };
    if (filters.plate) {
      filtersParams.plate = filters.plate;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });
    return this.http.get<PositionEvent[]>('reports/monitoring/travelend?1=1', { params });
  }

  getTrackingCommandsHistory(filters: BaseVehicleFilter): Observable<CommandSentHistory[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
        plate: filters.plate
      }
    });
    return this.http.get<CommandSentHistory[]>('reports/tracking/commandshistory?1=1', { params });
  }

  getTrackingPositionsHistory(filters: BaseVehicleFilter): Observable<Position[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
        plate: filters.plate || 'AOU0G63'
      }
    });
    return this.http.get<Position[]>('reports/tracking/positionshistory?1=1', { params });
  }

  getBaits(filters: BasePeriodFilter): Observable<MonitoringRequestBait[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<MonitoringRequestBait[]>('reports/events/bait?1=1', { params });
  }

  getOperationalAuditCommands(filters: BaseUserFilter): Observable<CommandSentHistory[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
        user: filters.user,
      }
    });
    return this.http.get<CommandSentHistory[]>('reports/events/operationalauditcommands?1=1', { params });
  }

  getOperationalAuditMessages(filters: BaseUserFilter): Observable<CommandSentHistory[]> {
    const filtersParams: any = {
      from_date: filters.from,
      to_date: filters.to,
    };
    if (filters.user) {
      filtersParams.user = filters.user;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });
    return this.http.get<CommandSentHistory[]>('reports/events/operationalauditmessages?1=1', { params });
  }

  getMacroVehicleReport(form: BaseMacroFilter): Observable<MacroVehicleReport[]> {
    const filtersParams: any = {
      from_date: form.from,
      to_date: form.to,
      customer: form.customer,
    };
    if (form.plate) {
      filtersParams.plate = form.plate;
    }
    if (form.type) {
      filtersParams.type = form.type;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });

    return this.http.get<MacroVehicleReport[]>('reports/tracking/macrovehicle?1=1', { params });
  }

  getAnalyticalReport(form: BaseVehicleFilter): Observable<MacroVehicleReport[]> {
    const filtersParams: any = {
      from_date: form.from,
      to_date: form.to,
      customer: form.customer,
    };
    if (form.plate) {
      filtersParams.plate = form.plate;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });

    return this.http.get<MacroVehicleReport[]>('reports/events/analytical?1=1', { params });
  }
}
