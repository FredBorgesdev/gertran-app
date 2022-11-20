import { Injectable } from '@angular/core';
import ApiService, {GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Checklist {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistsService implements ApiService<Checklist> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<Checklist>> {
    return this.http.get<GetAllResponse<Checklist>>('checklists');
  }

  get(id: string): Observable<Checklist> {
    return this.http.get<Checklist>(`checklists/${id}`);
  }

  save(checklist: Omit<Checklist, 'id'>): Observable<Checklist> {
    return this.http.post<Checklist>('checklists/create', checklist);
  }

  update(id: string, checklist: Omit<Checklist, 'id'>): Observable<Checklist> {
    return this.http.patch<Checklist>(`checklists/${id}/update`, checklist);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`checklists/${id}/delete`);
  }
}
