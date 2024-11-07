import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';
import {MonitoringRequests} from "../monitoring-requests/monitoring-requests.service";

export interface IncidentType {
  id: string;
  type: string;
  instructions: string;
  requireTrackerAction: boolean;
  requireDriverAction: boolean;
  requireShipperAction: boolean;
  requireImmediateAction: boolean;
  requireFederalPolice_action: boolean;
  requireAdditionalInformation: boolean;
  requireOptionalEmail: boolean;
}

export interface Incident {
  vehicleTrackers: any;
  id: string;
  pkId: string;
  incidentType: IncidentType;
  solvedBy?: any;
  wasAddedByAutomation: boolean;
  datetime: Date;
  incidentDatetime: Date;
  incidentLocation: string;
  incidentLatitude: number;
  incidentLongitude: number;
  driverName: string;
  driverPhone?: any;
  driverContactedAt?: any;
  shipperName: string;
  shipperContactedAt?: any;
  wasImmediateActionApproved?: any;
  immediateActionResponsibleName?: any;
  immediateActionTakenAt?: any;
  wasFederalPoliceActionNeeded?: any;
  federalPoliceActionResponsibleName?: any;
  federalPoliceActionTakenAt?: any;
  additionalInformation?: any;
  optionalEmail?: any;
  wasSolved: boolean;
  monitoringRequest: MonitoringRequests;
  createdBy: {
    id: string;
    name: string;
  };
  procedure1: string;
  procedure2: string;
  procedure3: string;
  procedure4: string;
  procedure5: string;
  procedure6: string;
  procedure7: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentsService implements ApiService<Incident> {

  constructor(private http: HttpClient) {
  }

  getAll(
    pagination: Pagination,
    filters?: { monitoringRequest?: string; truck?: string }
  ): Observable<GetAllResponse<Incident>> {
    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.monitoringRequest) {
      params.monitoring_request = filters.monitoringRequest;
    }
    if (filters?.truck) {
      params.truck = filters.truck;
    }

    return this.http.get<GetAllResponse<Incident>>('incidents', {params});
  }

  get(id: string, ...params): Observable<Incident> {
    throw new Error('Method not implemented.');
  }

  save(data: Incident, ...params): Observable<Incident> {
    return this.http.post<Incident>('incidents/create', data);
  }

  update(id: string, data: Incident, ...params): Observable<Incident> {
    throw new Error('Method not implemented.');
  }

  delete(id: string, ...params): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
