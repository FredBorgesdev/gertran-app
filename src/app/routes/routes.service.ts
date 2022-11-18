import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stop} from '../stops/stops.service';

export interface Route {
  id: string;
  name: string;
  code?: string;
  description?: string;
  lead?: number;
  points: {
    id: string;
    point: Stop;
    order: number;
    latitude: number;
    longitude: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService implements ApiService<Route> {

  constructor(private http: HttpClient) { }

  getAll(
    pagination: Pagination,
    filters?: {
      hasPoints?: boolean;
      description?: string;
    }
  ): Observable<GetAllResponse<Route>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.hasPoints) {
      params.has_points = filters.hasPoints;
    }
    if (filters?.description) {
      params.description = filters.description;
    }

    return this.http.get<GetAllResponse<Route>>('settings/routes', { params });
  }

  get(id: string): Observable<Route> {
    return this.http.get<Route>(`settings/routes/${id}`);
  }

  save(data: Route): Observable<Route> {
    return this.http.post<Route>('settings/routes/create', data);
  }

  update(id: string, data: Route): Observable<Route> {
    return this.http.patch<Route>(`settings/routes/${id}/update`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/routes/${id}/delete`);
  }
}
