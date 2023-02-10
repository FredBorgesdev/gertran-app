import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Customer} from './customers.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface WorkdayAutomations {
  id: string;
  customer: Customer;
  workdayStatus: string;
  monitoringRequestStatus: string;
  eventDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkdayAutomationsService implements ApiService<WorkdayAutomations> {

  constructor(private http: HttpClient) { }

  get(id: string, customerId: string): Observable<WorkdayAutomations> {
    return this.http.get<WorkdayAutomations>(`customers/${customerId}/workday_automations/${id}`);
  }

  getAll(pagination: Pagination, customerId: string): Observable<GetAllResponse<WorkdayAutomations>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<WorkdayAutomations>>(`customers/${customerId}/workday_automations`, { params });
  }

  save(data: WorkdayAutomations, customerId: string): Observable<WorkdayAutomations> {
    return this.http.post<WorkdayAutomations>(`customers/${customerId}/workday_automations/create`, data);
  }

  update(id: string, data: WorkdayAutomations, customerId: string): Observable<WorkdayAutomations> {
    return this.http.patch<WorkdayAutomations>(`customers/${customerId}/workday_automations/${id}/update`, data);
  }

  delete(id: string, customerId: string): Observable<void> {
    return this.http.delete<void>(`customers/${customerId}/workday_automations/${id}/delete`);
  }
}
