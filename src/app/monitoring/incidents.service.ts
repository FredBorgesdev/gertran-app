import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ApiService, {GetAllResponse} from '../shared/services/api.service';
import {Observable} from 'rxjs';

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
  id: string;
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
  shipperContacted_at?: any;
  wasImmediateActionApproved?: any;
  immediateActionResponsibleName?: any;
  immediateActionTakenAt?: any;
  wasFederalPoliceActionNeeded?: any;
  federalPoliceActionResponsibleName?: any;
  federalPoliceActionTakenAt?: any;
  additionalInformation?: any;
  optionalEmail?: any;
  wasSolved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GetAllResponse<Incident>> {
    return this.http.get<GetAllResponse<Incident>>('incidents');
  }
}
