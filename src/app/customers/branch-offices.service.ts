import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface BranchOffice {
  id: string;
  cnpj: string;
  tradingName: string;
  corporateName: string;
  domain: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class BranchOfficesService implements ApiService<BranchOffice> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, customerId: string): Observable<GetAllResponse<BranchOffice>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    return this.http.get<GetAllResponse<BranchOffice>>(
      `customers/${customerId}/branch-offices`,
      { params }
    );
  }

  get(id: string, customerId: string): Observable<BranchOffice> {
    return this.http.get<BranchOffice>(`customers/${customerId}/branch-offices/${id}`);
  }

  save(body: any, customerId: string): Observable<BranchOffice> {
    return this.http.post<BranchOffice>(`customers/${customerId}/branch-offices/create`, body);
  }

  update(id: string, body: any, customerId: string): Observable<BranchOffice> {
    return this.http.patch<BranchOffice>(`customers/${customerId}/branch-offices/${id}/update`, body);
  }

  delete(id: string, customerId: string): Observable<void> {
    return this.http.delete<void>(`customers/${customerId}/branch-offices/${id}/delete`);
  }
}
