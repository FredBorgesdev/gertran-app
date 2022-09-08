import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface ContactDataItem {
  id: number
  name: string
  email: string
  cellPhone: string
  phone: string
  main?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements ApiService<ContactDataItem> {

  constructor(private http: HttpClient) { }

  getAll(customerId: string) {
    return this.http.get<ContactDataItem[]>(`customers/${customerId}/contacts`);
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
