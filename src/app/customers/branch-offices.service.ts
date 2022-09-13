import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';

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

  getAll(pagination: Pagination, customerId: string) {
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

  get(id: string, customerId: string) {
    return this.http.get<BranchOffice>(`customers/${customerId}/branch-offices/${id}`);
  }

  save(body: any, customerId: string) {
    return this.http.post<BranchOffice>(`customers/${customerId}/branch-offices/create`, body);
  }

  update(id: string, body: any, customerId: string) {
    return this.http.patch<BranchOffice>(`customers/${customerId}/branch-offices/${id}/update`, body);
  }

  delete(id: string, customerId: string) {
    return this.http.delete<BranchOffice>(`customers/${customerId}/branch-offices/${id}/delete`);
  }
}
