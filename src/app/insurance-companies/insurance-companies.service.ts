import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InsuranceCompany {
  id: string
  email?: string
  logo?: string
  name: string
  phone: string
  website?: string
}

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompaniesService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<InsuranceCompany[]> {
    return this.http.get<InsuranceCompany[]>('insurance-companies');
  }

  get(id: string): Observable<InsuranceCompany> {
    return this.http.get<InsuranceCompany>(`insurance-companies/${id}`);
  }
  
  save(insuranceCompany: Omit<InsuranceCompany, 'id'>): Observable<InsuranceCompany> {
    // TODO: remove when backend is ready
    delete insuranceCompany.logo

    return this.http.post<InsuranceCompany>('insurance-companies/create', insuranceCompany);
  }

  update(
    id: string,
    insuranceCompany: Omit<InsuranceCompany, 'id'>
  ): Observable<InsuranceCompany> {
    // TODO: remove when backend is ready
    delete insuranceCompany.logo

    return this.http.patch<InsuranceCompany>(`insurance-companies/${id}/update`, insuranceCompany);
  }
}
