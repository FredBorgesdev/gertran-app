import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceCte: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoicesService implements ApiService<Invoice> {

  constructor(private http: HttpClient) {
  }

  getAll(pagination: Pagination, monitoringRequestId: string): Observable<GetAllResponse<Invoice>> {
    const params = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<GetAllResponse<Invoice>>(`monitoring/monitoring-requests/${monitoringRequestId}/invoices`, {params});
  }

  get(id: string, monitoringRequestId: string): Observable<Invoice> {
    return this.http.get<Invoice>(`monitoring/monitoring-requests/${monitoringRequestId}/invoices/${id}`);
  }

  save(invoice: Partial<Invoice>, monitoringRequestId: string): Observable<Invoice> {
    return this.http.post<Invoice>(`monitoring/monitoring-requests/${monitoringRequestId}/invoices/create`, invoice);
  }

  update(id: string, invoice: Partial<Invoice>, monitoringRequestId: string): Observable<Invoice> {
    return this.http.patch<Invoice>(`monitoring/monitoring-requests/${monitoringRequestId}/invoices/${id}/update`, invoice);
  }

  delete(id: string, monitoringRequestId: string): Observable<void> {
    return this.http.delete<void>(`monitoring/monitoring-requests/${monitoringRequestId}/invoices/${id}/delete`);
  }
}
