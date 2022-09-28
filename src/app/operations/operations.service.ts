import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, {GetAllResponse} from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface Operations {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class OperationsService implements ApiService<Operations> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<GetAllResponse<Operations>> {
    return this.http.get<GetAllResponse<Operations>>('settings/operations');
  }

  get(id: string): Observable<Operations> {
    return this.http.get<Operations>(`settings/operations/${id}`);
  }

  save(operations: Omit<Operations, 'id'>): Observable<Operations> {
    return this.http.post<Operations>('settings/operations/create', operations);
  }

  update(
    id: string,
    operations: Omit<Operations, 'id'>
  ): Observable<Operations> {
    return this.http.patch<Operations>(`settings/operations/${id}/update`, operations);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/operations/${id}/delete`);
  }
}

