import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';

export interface InsuranceCompany {
  id: string;
  email?: string;
  logo?: string;
  name: string;
  phone: string;
  website?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompaniesService implements ApiService<InsuranceCompany> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination) {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<InsuranceCompany>>('insurance-companies', { params });
  }

  get(id: string) {
    return this.http.get<InsuranceCompany>(`insurance-companies/${id}`);
  }

  save(insuranceCompany: Omit<InsuranceCompany, 'id'>) {
    // TODO: remove when backend is ready
    delete insuranceCompany.logo;

    return this.http.post<InsuranceCompany>('insurance-companies/create', insuranceCompany);
  }

  update(
    id: string,
    insuranceCompany: Omit<InsuranceCompany, 'id'>
  ) {
    // TODO: remove when backend is ready
    delete insuranceCompany.logo;

    return this.http.patch<InsuranceCompany>(`insurance-companies/${id}/update`, insuranceCompany);
  }

  delete(id: string) {
    return this.http.delete<InsuranceCompany>(`insurance-companies/${id}/delete`);
  }
}
