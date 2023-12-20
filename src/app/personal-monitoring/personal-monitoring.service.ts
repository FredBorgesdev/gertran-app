import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface User{
  id:any,
  name:any
}

export interface PersonalMonitoring {
  id: any;
  pkId: any;
  user: User;
  user_id: any;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalMonitoringService implements ApiService<PersonalMonitoring> {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(pagination: Pagination): Observable<GetAllResponse<PersonalMonitoring>> {
    const params = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<PersonalMonitoring>>('personal_monitoring', {params});
  }

  get(id: string): Observable<PersonalMonitoring> {
    return this.http.get<PersonalMonitoring>(`personal_monitoring/${id}/detail`);
  }

  save(PersonalMonitoring: Omit<PersonalMonitoring, 'id'>): Observable<PersonalMonitoring> {
    return this.http.post<PersonalMonitoring>('personal_monitoring/create', PersonalMonitoring);
  }

  update(
    id: string,
    PersonalMonitoring: Omit<PersonalMonitoring, 'id'>
  ): Observable<PersonalMonitoring> {

    return this.http.patch<PersonalMonitoring>(`personal_monitoring/${id}/update`, PersonalMonitoring);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`personal_monitoring/${id}/delete`);
  }

}
