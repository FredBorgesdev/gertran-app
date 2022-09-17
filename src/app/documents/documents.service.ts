import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface Document {
  id: string;
  title: string;
  documentType: {
    id: number
    name: string
  };
  file: string | File;
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

  getAll(
    pagination: Pagination,
    resource: DocumentResource,
    resourceId: string
  ): Observable<GetAllResponse<Document>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Document>>(`${resource}/${resourceId}/documents`, { params });
  }

  get(
    id: string,
    resource: DocumentResource,
    resourceId: string
  ): Observable<Document> {
    return this.http.get<Document>(`${resource}/${resourceId}/documents/${id}`);
  }

  save(
    body: Omit<Document, 'id'>,
    resource: DocumentResource,
    resourceId: string
  ): Observable<Document> {
    let requestBody: any = body;
    if (body.file) {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('document_type', body.documentType.toString());
      formData.append('file', body.file);
      requestBody = formData;
    }

    return this.http.post<Document>(`${resource}/${resourceId}/documents/create`, requestBody);
  }

  update(
    id: string,
    body: Omit<Document, 'id'>,
    resource: DocumentResource,
    resourceId: string
  ): Observable<Document> {
    let requestBody: any = body;
    if (body.file) {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('document_type', body.documentType.toString());
      formData.append('file', body.file);
      requestBody = formData;
    } else {
      requestBody = {
        title: body.title,
        document_type: body.documentType
      };
    }

    return this.http.patch<Document>(`${resource}/${resourceId}/documents/${id}/update`, requestBody);
  }

  delete(
    id: string,
    resource: string,
    resourceId: string
  ): Observable<void> {
    return this.http.delete<void>(`${resource}/${resourceId}/documents/${id}/delete`);
  }
}
