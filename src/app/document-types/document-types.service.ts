import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';

export interface DocumentType {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService implements ApiService<DocumentType> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(pagination: Pagination): Observable<GetAllResponse<DocumentType>> {
    const params = { limit: DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<DocumentType>>('documents/document-types', { params });
  }

  get(id: string): Observable<DocumentType> {
    return this.http.get<DocumentType>(`documents/document-types/${id}`);
  }

  save(documentType: Omit<DocumentType, 'id'>): Observable<DocumentType> {
    return this.http.post<DocumentType>('documents/document-types/create', documentType);
  }

  update(
    id: string,
    documentType: Omit<DocumentType, 'id'>
  ): Observable<DocumentType> {
    return this.http.patch<DocumentType>(`documents/document-types/${id}/update`, documentType);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`documents/document-types/${id}/delete`);
  }
}
