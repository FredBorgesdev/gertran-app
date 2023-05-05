import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface SharedOperationsItem {
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
export class SharedOperationsService implements ApiService<SharedOperationsItem> {

  constructor(private http: HttpClient) {
  }

  getAll(pagination: Pagination, customerId: string): Observable<GetAllResponse<SharedOperationsItem>> {
    const params = {limit: DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<SharedOperationsItem>>(`customers/${customerId}/shared_operations`, {
      params
    });
  }

  get(id: string, customerId: string): Observable<SharedOperationsItem> {
    return this.http.get<SharedOperationsItem>(`customers/${customerId}/shared_operations/${id}`);
  }

  save(body: any, customerId: string): Observable<SharedOperationsItem> {
    return this.http.post<SharedOperationsItem>(`customers/${customerId}/shared_operations/create`, body);
  }

  update(id: string, body: any, customerId: string): Observable<SharedOperationsItem> {
    return this.http.patch<SharedOperationsItem>(`customers/${customerId}/shared_operations/${id}/update`, body);
  }

  delete(id: string, customerId: string): Observable<void> {
    return this.http.delete<void>(`customers/${customerId}/shared_operations/${id}/delete`);
  }
}
