import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrackerTechnologiesModels} from '../tracker-technologies/tracker-technologies-models.service';
import {MonitoringRequests} from '../monitoring-requests/monitoring-requests.service';

export interface Position {
  amountFuel: string | null;
  angleReference: string;
  city: string;
  destiny: string | null;
  driverName: string | null;
  id: string | null;
  ignition: boolean;
  isBlocked: boolean;
  latitude: number;
  longitude: number;
  odometer: string | null;
  operator: string | null;
  origin: string | null;
  positionDate: string | null;
  rpm: number;
  speed: number;
  state: string;
  street: string;
  trackerTechnologyName: string;
  timePosition: string;
  trackerSerialNumber: string;
  trackerModel: TrackerTechnologiesModels;
  truck: {
    id: string;
    vehicle: {
      plate: string;
      id: string;
    };
  };
  vehicleStatus: string;
  monitoringRequest: MonitoringRequests & {
    destinyCity: string;
    destinyState: string;
    originCity: string;
    originState: string;
    driverName: string;
    driverPhone: string;
  };
  customer: {
    id: string;
    name: string;
  };
  events: {
    eventDescription: string;
    eventName: string;
  }[];
  wagons: string[];
  observations?: string;
  automations: {
    createdAt: string;
    status: string;
    vehicleTracker: any;
    code: string;
    sentAt: string;
    sentByUser: any;
    observations: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PositionsService implements ApiService<Position> {

  constructor(private http: HttpClient) { }

  getAll(
    pagination: Pagination,
    filters?: {
      customer?: string;
      terminal?: string;
      groupBy?: string;
      travelStatus?: string
      travelling?: boolean
    }
  ): Observable<GetAllResponse<Position>> {
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
    if (filters?.travelling) {
      params.travelling = filters.travelling;
    }

    return this.http.get<GetAllResponse<Position>>('positions', { params });
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

  updatePointReferences(ids: string[]): Observable<{
    id: string;
    latitude: number;
    longitude: number;
    pointReference: string;
  }[]> {
    return this.http.patch<any[]>('positions/update_points_reference', { position_ids: ids });
  }
}
