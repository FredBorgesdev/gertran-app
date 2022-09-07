import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DocumentType {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>('documents/document-types');
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

  delete(id: string): Observable<DocumentType> {
    return this.http.delete<DocumentType>(`documents/document-types/${id}/delete`);
  }
}
