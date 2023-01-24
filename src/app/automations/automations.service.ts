import {Injectable} from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Automation {
  id: string;
  event: 'automation' | 'manual';
  action: 'add' | 'remove';
  command: 'add' | 'remove';
  isActive: boolean;
  isForAllCustomers: boolean;
  customers: {
    id: string;
    name: string;
  }[];
  name: string;
  hasTravelSm: boolean;
  hasVehicleMessage: boolean;
  vehicleMessage: string;
  hasTimeAction: boolean;
  timeAction: number;
  hasVelocity: boolean;
  velocity: number;
  hasIgnition: boolean;
  ignitionMessage: string;
  hasCommand: boolean;
  hasSendMessage: boolean;
  sendMessage: string;
  hasAlertOperator: boolean;
  alertOperatorMessage: string;
  hasOccurrence: boolean;
  occurrenceMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutomationsService implements ApiService<Automation> {

  constructor(private http: HttpClient) {
  }

  getAll(pagination: Pagination): Observable<GetAllResponse<Automation>> {
    const params = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Automation>>('settings/automations', {params});
  }

  get(id: string): Observable<Automation> {
    return this.http.get<Automation>(`settings/automations/${id}`);
  }

  save(automation: Automation): Observable<Automation> {
    return this.http.post<Automation>(`settings/automations/create`, automation);
  }

  update(id: string, automation: Automation): Observable<Automation> {
    return this.http.patch<Automation>(`settings/automations/${id}/update`, automation);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/automations/${id}/delete`);
  }

  getEvents(): Observable<Choice[]> {
    return this.http.get<Choice[]>('settings/automations/events');
  }

  getActions(): Observable<Choice[]> {
    return this.http.get<Choice[]>('settings/automations/actions');
  }

  getCommands(): Observable<Choice[]> {
    return this.http.get<Choice[]>('settings/automations/commands');
  }

  getAutomationsByPlate(plate: string): Observable<GetAllResponse<Automation>> {
    return this.http.get<GetAllResponse<Automation>>(`settings/automations/history`, {
      params: {
        plate,
        limit: 999
      }
    });
  }
}
