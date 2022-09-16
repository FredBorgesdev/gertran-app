import { Injectable } from '@angular/core';
import ApiService, {GetAllResponse} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Stop {
  id: string;
  name: string;
  description: string;
  address: string;
  state: string;
  city: string;
  lat?: number;
  lng?: number;
  radius: number;
  typeId: number;
  typeCategoryIds: number[];
  workingHours?: {
    [key: string]: {
      start: string
      end: string
      fullDay: boolean
      expectedG2g: string
      hiredG2g: string
      checkedG2g: string
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class StopsService implements ApiService<Stop> {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GetAllResponse<Stop>> {
    return this.http.get<GetAllResponse<Stop>>('/stops');
  }

  get(id: string): Observable<Stop> {
    return this.http.get<Stop>(`/stops/${id}`);
  }

  save(resource: Stop): Observable<Stop> {
    return this.http.post<Stop>('/stops/create', resource);
  }

  update(id: string, resource: Stop): Observable<Stop> {
    return this.http.patch<Stop>(`/stops/${id}/update`, resource);
  }

  delete(id: string): Observable<Stop> {
    return this.http.delete<Stop>(`/stops/${id}/delete`);
  }
}
