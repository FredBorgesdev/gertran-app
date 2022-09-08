import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface CustomerDocument {
  id: string
  title: string
  documentType: {
    id: number
    name: string
  }
  file: string | File
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService implements ApiService<CustomerDocument> {

  constructor(private http: HttpClient) { }

  getAll(customerId: string) {
    return this.http.get<CustomerDocument[]>(`customers/${customerId}/documents`);
  }

  get(id: string, customerId: string) {
    return this.http.get<CustomerDocument>(`customers/${customerId}/documents/${id}`);
  }

  save(body: Omit<CustomerDocument, 'id'>, customerId: string) {
    let requestBody: any = body
    if (body.file) {
      const formData = new FormData()
      formData.append('title', body.title)
      formData.append('document_type', body.documentType.toString())
      formData.append('file', body.file)
      requestBody = formData
    }

    return this.http.post<CustomerDocument>(`customers/${customerId}/documents/create`, requestBody);
  }

  update(id: string, body: Omit<CustomerDocument, 'id'>, customerId: string) {
    let requestBody: any = body
    if (body.file) {
      const formData = new FormData()
      formData.append('title', body.title)
      formData.append('document_type', body.documentType.toString())
      formData.append('file', body.file)
      requestBody = formData
    } else {
      requestBody = {
        title: body.title,
        document_type: body.documentType
      }
    }

    return this.http.patch<CustomerDocument>(`customers/${customerId}/documents/${id}/update`, requestBody);
  }

  delete(id: string, customerId: string) {
    return this.http.delete<CustomerDocument>(`customers/${customerId}/documents/${id}/delete`);
  }
}
