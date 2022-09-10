import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface TrackerTechnologies {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TrackerTechnologiesService implements ApiService<TrackerTechnologies> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<TrackerTechnologies[]>('trackers/tracker-technologies');
  }

  get(id: string) {
    return this.http.get<TrackerTechnologies>(`trackers/tracker-technologies/${id}`);
  }

  save(trackerTechnologies: Omit<TrackerTechnologies, 'id'>) {
    return this.http.post<TrackerTechnologies>('trackers/tracker-technologies/create', trackerTechnologies);
  }

  update(
    id: string,
    trackerTechnologies: Omit<TrackerTechnologies, 'id'>
  ) {
    return this.http.patch<TrackerTechnologies>(`trackers/tracker-technologies/${id}/update`, trackerTechnologies);
  }

  delete(id: string) {
    return this.http.delete<TrackerTechnologies>(`trackers/tracker-technologies/${id}/delete`);
  }
}

