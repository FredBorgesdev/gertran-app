import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Workday {
  id: string;
  maximumWorkdayPeriod: number;
  maximumHoursContinuousDriving: number;
  restPeriodToBreakContinuousDriving: number;
  maximumHoursDailyDriving: number;
  minimumContinuousRestPeriod: number;
  minimumLunchRestPeriod: number;
  restPeriodBetweenWorkingDays: number;
  maximumHoursPerWeek: number;
  maximumContinuousRestPeriod: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkdayService implements ApiService<Workday> {

  constructor(private http: HttpClient) { }

  get(id: string, customerId: string): Observable<Workday> {
    return this.http.get<Workday>(`customers/${customerId}/workday_settings/${id}`);
  }

  getAll(pagination: Pagination, customerId: string): Observable<GetAllResponse<Workday>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Workday>>(`customers/${customerId}/workday_settings`, { params });
  }

  save(data: Workday, customerId: string): Observable<Workday> {
    return this.http.post<Workday>(`customers/${customerId}/workday_settings/create`, data);
  }

  update(id: string, data: Workday, customerId: string): Observable<Workday> {
    return this.http.patch<Workday>(`customers/${customerId}/workday_settings/${id}/update`, data);
  }

  delete(id: string, customerId: string): Observable<void> {
    return this.http.delete<void>(`customers/${customerId}/workday_settings/${id}/delete`);
  }
}
