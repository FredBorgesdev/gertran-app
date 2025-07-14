import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import { Observable } from 'rxjs';

export interface UserCustomerBranchOffice {
  id: string;
  user: {id:string};
  customer: {id: string};
  branch_office: {id: string};
}

@Injectable({
  providedIn: 'root'
})
export class UserCustomerBranchOfficeService implements ApiService<UserCustomerBranchOffice> {
  constructor(private http: HttpClient) {}

  getAll(pagination: Pagination, filters?: any): Observable<GetAllResponse<UserCustomerBranchOffice>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    console.log(filters)
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if(filters?.customer){
      params.customer = filters.customer
    }

    if(filters?.user){
      params.user = filters.user
    }
    return this.http.get<GetAllResponse<UserCustomerBranchOffice>>('users/user-customer-branch-office', { params });
  }

  get(id: string): Observable<UserCustomerBranchOffice> {
    return this.http.get<UserCustomerBranchOffice>(`users/user-customer-branch-office/${id}`);
  }

  save(item: Omit<UserCustomerBranchOffice, 'id'>): Observable<UserCustomerBranchOffice> {
    return this.http.post<UserCustomerBranchOffice>(`users/user-customer-branch-office/create`, item);
  }

  update(id: string, item: Omit<UserCustomerBranchOffice, 'id'>): Observable<UserCustomerBranchOffice> {
    return this.http.patch<UserCustomerBranchOffice>(`users/user-customer-branch-office/${id}/update`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`users/user-customer-branch-office/${id}/delete`);
  }
}
