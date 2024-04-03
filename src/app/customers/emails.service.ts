import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface EmailDataItem {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailsService implements ApiService<EmailDataItem> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, customerId: string): Observable<GetAllResponse<EmailDataItem>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<EmailDataItem>>(`customers/${customerId}/emails`, {
      params
    });
  }

  get(id: string, customerId: string): Observable<EmailDataItem> {
    return this.http.get<EmailDataItem>(`customers/${customerId}/emails/${id}`);
  }

  save(body: any, customerId: string): Observable<EmailDataItem> {
    return this.http.post<EmailDataItem>(`customers/${customerId}/emails/create`, body);
  }

  update(id: string, body: any, customerId: string): Observable<EmailDataItem> {
    return this.http.patch<EmailDataItem>(`customers/${customerId}/emails/${id}/update`, body);
  }

  delete(id: string, customerId: string): Observable<void> {
    return this.http.delete<void>(`customers/${customerId}/emails/${id}/delete`);
  }
}
