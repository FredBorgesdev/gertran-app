import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';
import {Customer} from "../customers/customers.service";

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
  ) {
  }

  getAll(pagination: Pagination): Observable<GetAllResponse<InsuranceCompany>> {
    const params = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<InsuranceCompany>>('insurance-companies', {params});
  }

  get(id: string): Observable<InsuranceCompany> {
    return this.http.get<InsuranceCompany>(`insurance-companies/${id}`);
  }

  save(insuranceCompany: Omit<InsuranceCompany, 'id'>): Observable<InsuranceCompany> {
    // TODO: remove when backend is ready
    delete insuranceCompany.logo;

    return this.http.post<InsuranceCompany>('insurance-companies/create', insuranceCompany);
  }

  update(
    id: string,
    insuranceCompany: Omit<InsuranceCompany, 'id'>
  ): Observable<InsuranceCompany> {
    // TODO: remove when backend is ready
    delete insuranceCompany.logo;

    return this.http.patch<InsuranceCompany>(`insurance-companies/${id}/update`, insuranceCompany);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`insurance-companies/${id}/delete`);
  }

  getCustomers(): Observable<GetAllResponse<Customer>> {
    return this.http.get<GetAllResponse<Customer>>('insurance-companies/customers', {
      params: {
        limit: 999
      }
    });
  }
}
