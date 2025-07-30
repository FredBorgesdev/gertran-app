import { Observable } from "rxjs";
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from "../shared/services/api.service";
import { HttpClient } from "@angular/common/http";

export interface GertranDirect {
  id: string; 
  cnpj?: string | null;
  company?: string | null;
  zip_code?: string | null;
  address?: string | null;
  state?: string | null;
  city?: string | null;
  name: string; 
  email?: string | null;
  token?: string | null; 
  stateRegistration: string | null;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GertranDirectService implements ApiService<GertranDirect> {
  constructor(
    private http: HttpClient,
  ) {}

  get(id: string, ...params: any): Observable<GertranDirect> {
    return this.http.get<GertranDirect>(`gertran-direct/${id}`);
  }
  getAll(pagination: Pagination, filters: any = {}): Observable<GetAllResponse<GertranDirect>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value;
      }
    });
    return this.http.get<GetAllResponse<GertranDirect>>('gertran-direct', { params });

  }
  save(data: Omit<GertranDirect, 'id'>, ...params: any): Observable<GertranDirect> {
    return this.http.post<GertranDirect>('gertran-direct/create', data);
  }
  update(id: string, data: GertranDirect, ...params: any): Observable<GertranDirect> {
    return this.http.patch<GertranDirect>(`gertran-direct/${id}/update`, data)
  }
  delete(id: string, ...params: any): Observable<void> {
    return this.http.delete<void>(`gertran-direct/${id}/delete`)
  }
  approve(id:string): Observable<void>{
    return this.http.post<void>(`gertran-direct/${id}/valid`, {})
  }
}