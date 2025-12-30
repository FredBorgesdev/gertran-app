import {Injectable} from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
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
  getWorkday(workdayId: string):  Observable<any>{
    return this.http.get<void>(`workdays/${workdayId}`);
  }
  updateWorkday(workdayId: string, value: any) :  Observable<any> {
    return this.http.patch<void>(`workdays/${workdayId}/update`, value);
  }
  createWorkday(value: any) :  Observable<any>{
    return this.http.post<void>(`workdays/create`, value);
  }

  constructor(private http: HttpClient) {
  }

  getAllWorkdays(pagination: Pagination, customerId: string, driverId: string, from: string, to: string): Observable<GetAllResponse<Workday>> {
    const params = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    params['customer']=customerId
    params['driver']=driverId
    params['fromDate']=from
    params['toDate']=to

    return this.http.get<GetAllResponse<Workday>>(`workdays`, {params});
  }

  deleteWorkday(id: string): Observable<void> {
    return this.http.delete<void>(`workdays/${id}/delete`);
  }

  get(id: string, customerId: string): Observable<Workday> {
  return this.http.get<Workday>(`customers/${customerId}/workday_settings/${id}`);
  }

  getAll(pagination: Pagination, customerId: string): Observable<GetAllResponse<Workday>> {
    const params = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

  return this.http.get<GetAllResponse<Workday>>(`customers/${customerId}/workday_settings`, {params});
  }

  save(data: Workday, customerId: string): Observable<Workday> {
    const payload: any = {
      maximum_workday_period: data.maximumWorkdayPeriod,
      maximum_hours_continuous_driving: data.maximumHoursContinuousDriving,
      rest_period_to_break_continuous_driving: data.restPeriodToBreakContinuousDriving,
      maximum_hours_daily_driving: data.maximumHoursDailyDriving,
      minimum_continuous_rest_period: data.minimumContinuousRestPeriod,
      minimum_lunch_rest_period: data.minimumLunchRestPeriod,
      rest_period_between_working_days: data.restPeriodBetweenWorkingDays,
      maximum_hours_per_week: data.maximumHoursPerWeek,
      maximum_continuous_rest_period: data.maximumContinuousRestPeriod,
    };
    // Remove undefined/null to evitar validação com campos vazios
    Object.keys(payload).forEach(k => (payload[k] == null) && delete payload[k]);
    console.log('[WorkdaySettings] POST payload', payload, 'customerId=', customerId);
  return this.http.post<Workday>(`customers/${customerId}/workday_settings/create`, payload);
  }

  update(id: string, data: Workday, customerId: string): Observable<Workday> {
    const payload: any = {
      maximum_workday_period: data.maximumWorkdayPeriod,
      maximum_hours_continuous_driving: data.maximumHoursContinuousDriving,
      rest_period_to_break_continuous_driving: data.restPeriodToBreakContinuousDriving,
      maximum_hours_daily_driving: data.maximumHoursDailyDriving,
      minimum_continuous_rest_period: data.minimumContinuousRestPeriod,
      minimum_lunch_rest_period: data.minimumLunchRestPeriod,
      rest_period_between_working_days: data.restPeriodBetweenWorkingDays,
      maximum_hours_per_week: data.maximumHoursPerWeek,
      maximum_continuous_rest_period: data.maximumContinuousRestPeriod,
    };
    Object.keys(payload).forEach(k => (payload[k] == null) && delete payload[k]);
    console.log('[WorkdaySettings] PATCH payload', payload, 'id=', id, 'customerId=', customerId);
  return this.http.patch<Workday>(`customers/${customerId}/workday_settings/${id}/update`, payload);
  }

  delete(id: string, customerId: string): Observable<void> {
  return this.http.delete<void>(`customers/${customerId}/workday_settings/${id}/delete`);
  }

  getWorkdayStatus(justificationOnly = false): Observable<Choice[]> {
    const params = {justification_only: justificationOnly};

    return this.http.get<Choice[]>('workdays/status', {params});
  }

  getTravelStatus(): Observable<Choice[]> {
    return this.http.get<Choice[]>('workdays/travel_status');
  }

  justify(body: {
    driver: string;
    customer: string;
    startedAt: string;
    status: string;
    observations: string;
  }): Observable<void> {
    return this.http.post<void>('workdays/justification', body);
  }
}
