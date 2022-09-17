import { Injectable } from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Wagon {
  id: string;
  name: string;
  plate: string;
  brand: string;
  model: string;
}

@Injectable({
  providedIn: 'root'
})
export class WagonsService implements ApiService<Wagon> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<Wagon>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Wagon>>('wagons', { params });
  }

  get(id: string): Observable<Wagon> {
    return this.http.get<Wagon>(`wagons/${id}`);
  }

  save(wagon: Omit<Wagon, 'id'>): Observable<Wagon> {
    return this.http.post<Wagon>('wagons/create', wagon);
  }

  update(id: string, wagon: Omit<Wagon, 'id'>): Observable<Wagon> {
    return this.http.patch<Wagon>(`wagons/${id}/update`, wagon);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`wagons/${id}/delete`);
  }
}
