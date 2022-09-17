import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface TrackerTechnologiesModels {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackerTechnologiesModelsService implements ApiService<TrackerTechnologiesModels> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(
    pagination: Pagination,
    trackerTechnologyId: string
  ): Observable<GetAllResponse<TrackerTechnologiesModels>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<TrackerTechnologiesModels>>(
      `trackers/tracker-technologies/${trackerTechnologyId}/tracker-models`,
      { params }
    );
  }

  get(id: string, trackerTechnologyId: string): Observable<TrackerTechnologiesModels> {
    return this.http.get<TrackerTechnologiesModels>(`trackers/tracker-technologies/${trackerTechnologyId}/tracker-models/${id}`);
  }

  save(
    trackerTechnologiesModel: Omit<TrackerTechnologiesModels, 'id'>,
    trackerTechnologyId: string
  ): Observable<TrackerTechnologiesModels> {
    return this.http.post<TrackerTechnologiesModels>(
      `trackers/tracker-technologies/${trackerTechnologyId}/tracker-models/create`,
      trackerTechnologiesModel
    );
  }

  update(
    id: string,
    trackerTechnologiesModels: Omit<TrackerTechnologiesModels, 'id'>,
    trackerTechnologyId: string
  ): Observable<TrackerTechnologiesModels> {
    return this.http.patch<TrackerTechnologiesModels>(
      `trackers/tracker-technologies/${trackerTechnologyId}/tracker-models/${id}/update`,
      trackerTechnologiesModels
    );
  }

  delete(
    id: string,
    trackerTechnologyId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `trackers/tracker-technologies/${trackerTechnologyId}/tracker-models/${id}/delete`,
    );
  }
}

