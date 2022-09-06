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
}
