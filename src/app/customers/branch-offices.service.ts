import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface BranchOffice {
  id: string
  cnpj: string
  tradingName: string
  corporateName: string
  domain: string | null
}

@Injectable({
  providedIn: 'root'
})
export class BranchOfficesService implements ApiService<BranchOffice> {

  constructor(private http: HttpClient) { }

  getAll(customerId: string) {
    return this.http.get<BranchOffice[]>(`customers/${customerId}/branch-offices`);
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
