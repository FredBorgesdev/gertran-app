import { Injectable } from '@angular/core';
import ApiService, {
  DEFAULT_LIMIT,
  GetAllResponse,
  Pagination,
} from '../shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelStep } from "../monitoring-requests/travel-step.service";

interface PositionInfo {
  id: string;
  originState: string;
  originCity: string;
  destinyState: string;
  destinyCity: string;
  driverName: string;
  driverPhone: string;
  status: string;
  travelStatus: string;
  travelProgress: number;
  wagonsPlates: string;
  hasMacro: boolean;
  hasBaits: boolean;
  hasEmbeddedIntelligence: boolean;
  hasAutomations: boolean;
  observations: string;
}

interface PositionEvent {
  createdAt: string;
  eventName: string;
  eventDescription: string;
}

interface TrackerModel {
  id: string;
  name: string;
}

interface Customer {
  id: string;
  name: string;
}

interface Truck {
  id: string;
  observations: string;
}

interface MonitoringRequest {
  hasPanicButtonAlert: boolean;
  operation: any;
  travelStatus: string;
  id: string;
  status: string;
  travelSteps: TravelStep[];
}

export interface Position {
  id: string;
  ignition: boolean;
  origin: string;
  destiny: string;
  speed: string;
  trackerSerialNumber: string;
  latitude: number;
  longitude: number;
  street: string;
  vehicleStatus: string;
  pointReference: string;
  positionDate: string;
  temperature: number;
  trackerTechnologyName: string;
  customer: Customer;
  communicationChannel: string;
  vehiclePlate: string;
  truck: Truck;
  events: PositionEvent[];
  trackerModel: TrackerModel;
  positionInfo: PositionInfo;
  monitoringRequest: MonitoringRequest;
}

@Injectable({
  providedIn: 'root',
})
export class PositionsService implements ApiService<Position> {
  constructor(private http: HttpClient) {
  }

  getAll(
    pagination: Pagination,
    filters?: {
      customer?: string;
      terminal?: string;
      groupBy?: string;
      travelStatus?: string;
      travelling?: boolean;
      allowGlobal?: boolean;
    }
  ): Observable<GetAllResponse<Position>> {
    if (window.location.pathname == '/reports/dashboards/client')
      pagination.limit = 50

    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.customer) {
      params.customer = filters.customer;
    }
    if (filters?.terminal) {
      params.terminal = filters.terminal;
    }
    if (filters?.travelStatus) {
      params.travel_status = filters.travelStatus;
    }
    if (filters?.travelling !== undefined) {
      params.travelling = filters.travelling;
    }
    if (filters?.allowGlobal) {
      params.allow_global = filters.allowGlobal;
    }

    return this.http.get<GetAllResponse<Position>>('positions', { params });
  }

  getPositionsByMonitoringRequest(id: string): Observable<any> {
    return this.http.get<any>(`positions/positions-by-monitoring-request/${id}`);
  }

  get(id: string): Observable<Position> {
    return this.http.get<Position>(`positions/${id}`);
  }

  save(data: Position): Observable<Position> {
    return this.http.post<Position>('positions/create', data);
  }

  update(id: string, data: Position): Observable<Position> {
    return this.http.put<Position>(`positions/${id}/update`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`positions/${id}/delete`);
  }

  updatePointReferences(ids: string[]): Observable<
    {
      id: string;
      latitude: number;
      longitude: number;
      pointReference: string;
    }[]
  > {
    return this.http.patch<any[]>('positions/update_points_reference', {
      position_ids: ids,
    });
  }
}
