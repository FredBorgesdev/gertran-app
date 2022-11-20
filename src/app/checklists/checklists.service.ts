import { Injectable } from '@angular/core';
import ApiService, {GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Checklist {
  id: string;
  driverDoorChecked: boolean;
  passengerDoorChecked: boolean;
  wagonEngagedChecked: boolean;
  panelChecked: boolean;
  trunkChecked: boolean;
  sirenChecked: boolean;
  blockChecked: boolean;
  trunkLockChecked: boolean;
  hasMacro: boolean;
  hasEmbeddedIntelligence: boolean;
  approved: boolean;
  allowedTravel: boolean;
  justification: string;
  embeddedIntelligenceJustification: string;
  lastStatusUpdate: Date | null;
  hasPendencies: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistsService implements ApiService<Checklist> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<Checklist>> {
    return this.http.get<GetAllResponse<Checklist>>('monitoring/checklists');
  }

  get(id: string): Observable<Checklist> {
    return this.http.get<Checklist>(`monitoring/checklists/${id}`);
  }

  save(checklist: Omit<Checklist, 'id'>): Observable<Checklist> {
    return this.http.post<Checklist>('monitoring/checklists/create', checklist);
  }

  update(id: string, checklist: Omit<Checklist, 'id'>): Observable<Checklist> {
    return this.http.patch<Checklist>(`monitoring/checklists/${id}/update`, checklist);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`monitoring/checklists/${id}/delete`);
  }
}
