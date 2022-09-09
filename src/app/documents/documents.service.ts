import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService from '../shared/services/api.service';

export interface Document {
  id: string
  title: string
  documentType: {
    id: number
    name: string
  }
  file: string | File
}

export enum DocumentResource {
  CUSTOMER = 'customers',
  DRIVERS = 'drivers',
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService implements ApiService<Document> {

  constructor(private http: HttpClient) { }

  getAll(resource: DocumentResource, resourceId: string) {
    return this.http.get<Document[]>(`${resource}/${resourceId}/documents`);
  }

  get(id: string, resource: DocumentResource, resourceId: string) {
    return this.http.get<Document>(`${resource}/${resourceId}/documents/${id}`);
  }

  save(body: Omit<Document, 'id'>, resource: DocumentResource, resourceId: string) {
    let requestBody: any = body
    if (body.file) {
      const formData = new FormData()
      formData.append('title', body.title)
      formData.append('document_type', body.documentType.toString())
      formData.append('file', body.file)
      requestBody = formData
    }

    return this.http.post<Document>(`${resource}/${resourceId}/documents/create`, requestBody);
  }

  update(id: string, body: Omit<Document, 'id'>, resource: DocumentResource, resourceId: string) {
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

    return this.http.patch<Document>(`${resource}/${resourceId}/documents/${id}/update`, requestBody);
  }

  delete(id: string, resource:string, resourceId: string) {
    return this.http.delete<Document>(`${resource}/${resourceId}/documents/${id}/delete`);
  }
}
