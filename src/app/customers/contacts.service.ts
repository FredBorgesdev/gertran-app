import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';

export interface ContactDataItem {
  id: string;
  name: string;
  email: string;
  cellPhone: string;
  phone: string;
  main?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements ApiService<ContactDataItem> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, customerId: string) {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<ContactDataItem>>(`customers/${customerId}/contacts`, {
      params
    });
  }

  get(id: string, customerId: string) {
    return this.http.get<ContactDataItem>(`customers/${customerId}/contacts/${id}`);
  }

  save(body: any, customerId: string) {
    return this.http.post<ContactDataItem>(`customers/${customerId}/contacts/create`, body);
  }

  update(id: string, body: any, customerId: string) {
    return this.http.patch<ContactDataItem>(`customers/${customerId}/contacts/${id}/update`, body);
  }

  delete(id: string, customerId: string) {
    return this.http.delete<ContactDataItem>(`customers/${customerId}/contacts/${id}/delete`);
  }
}
