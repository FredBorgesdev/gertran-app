import { Injectable } from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Stop {
  customer: string;
  id: string;
  name: string;
  description: string;
  address: string;
  state: string;
  city: string;
  radius: number;
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

  pointType: string;
  latitude: any;
  longitude: any;
}

export enum PointTypes {
  START = 'start',
  END = 'end',
  WAYPOINT = 'waypoint',
}

@Injectable({
  providedIn: 'root'
})
export class StopsService implements ApiService<Stop> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<Stop>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Stop>>('settings/points', { params });
  }

  get(id: string): Observable<Stop> {
    return this.http.get<Stop>(`settings/points/${id}`);
  }

  save(resource: Stop): Observable<Stop> {
    return this.http.post<Stop>('settings/points/create', resource);
  }

  update(id: string, resource: Stop): Observable<Stop> {
    return this.http.patch<Stop>(`settings/points/${id}/update`, resource);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/points/${id}/delete`);
  }

  getTypes(): Observable<Choice[]> {
    return this.http.get<Choice[]>('settings/point-types');
  }
}
