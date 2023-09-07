import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from "../users/user";

export interface Checklist {
  updatedAt: string;
  createdAt: string;
  status: string;
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
  reviewedBy: User;
  reviewedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistsService implements ApiService<Checklist> {

  constructor(private http: HttpClient) {
  }

  getAll(pagination: Pagination): Observable<GetAllResponse<Checklist>> {
    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    return this.http.get<GetAllResponse<Checklist>>('monitoring/checklists', {params});
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

  get localizedValues(): {
    label: string;
    value: string;
  }[] {
    return [
      {
        label: 'Sensor Porta Motorista',
        value: 'driverDoorChecked',
      },
      {
        label: 'Sensor Porta Passageiro',
        value: 'passengerDoorChecked',
      },
      {
        label: 'Sensor de engate de carreta',
        value: 'wagonEngagedChecked',
      },
      {
        label: 'Sensor de Painel',
        value: 'panelSensorChecked',
      },
      {
        label: 'Sensor de Bau',
        value: 'trunkChecked',
      },
      {
        label: 'Sirene',
        value: 'sirenChecked',
      },
      {
        label: 'Bloqueio',
        value: 'blockChecked',
      },
      {
        label: 'Trava de Bau',
        value: 'trunkLockChecked',
      }
    ];
  }
}
