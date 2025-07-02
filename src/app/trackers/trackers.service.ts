import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Tracker {
  id: string;
  trackerId: string;
  trackerModel: {
    id: string;
    name: string;
    trackerTechnology: {
      id: string;
      name: string;
    }
  };
  isMain: boolean;
  sascarDigit: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackersService implements ApiService<Tracker> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, vehicleId: string): Observable<GetAllResponse<Tracker>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination?.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Tracker>>(`vehicles/${vehicleId}/vehicle-trackers`, { params });
  }

  get(id: string, vehicleId: string): Observable<Tracker> {
    return this.http.get<Tracker>(`vehicles/${vehicleId}/vehicle-trackers/${id}`);
  }

  save(tracker: Omit<Tracker, 'id'>, vehicleId: string): Observable<Tracker> {
    return this.http.post<Tracker>(`vehicles/${vehicleId}/vehicle-trackers/create`, tracker);
  }

  update(id: string, tracker: Omit<Tracker, 'id'>, vehicleId: string): Observable<Tracker> {
    return this.http.patch<Tracker>(`vehicles/${vehicleId}/vehicle-trackers/${id}/update`, tracker);
  }

  delete(id: string, vehicleId: string): Observable<void> {
    return this.http.delete<void>(`vehicles/${vehicleId}/vehicle-trackers/${id}/delete`);
  }
}
