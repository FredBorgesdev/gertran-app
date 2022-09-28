import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface TrackerTechnologies {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackerTechnologiesService implements ApiService<TrackerTechnologies> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<TrackerTechnologies>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<TrackerTechnologies>>('trackers/tracker-technologies', { params });
  }

  get(id: string): Observable<TrackerTechnologies> {
    return this.http.get<TrackerTechnologies>(`trackers/tracker-technologies/${id}`);
  }

  save(trackerTechnologies: Omit<TrackerTechnologies, 'id'>): Observable<TrackerTechnologies> {
    return this.http.post<TrackerTechnologies>('trackers/tracker-technologies/create', trackerTechnologies);
  }

  update(
    id: string,
    trackerTechnologies: Omit<TrackerTechnologies, 'id'>
  ): Observable<TrackerTechnologies> {
    return this.http.patch<TrackerTechnologies>(`trackers/tracker-technologies/${id}/update`, trackerTechnologies);
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`trackers/tracker-technologies/${id}/delete`);
  }
}

