import { Injectable } from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface OperationRuleByPriceValue {
  id: string;
  minimumPriceValue: string;
  maximumPriceValue: string;
  redundancyMinimum: string;
  armedGuard: boolean;
  rfBait: boolean
}

@Injectable({
  providedIn: 'root'
})
export class OperationsRulesByPriceValueService implements ApiService<OperationRuleByPriceValue> {

  constructor(private http: HttpClient) { }

  getAll(pagination: Pagination, operationId: string): Observable<GetAllResponse<OperationRuleByPriceValue>> {
    const params = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return this.http.get<any>(`settings/operations/${operationId}/rules-by-price-value`, { params });
  }

  get(id: string, operationId: string): Observable<OperationRuleByPriceValue> {
    return this.http.get<any>(`settings/operations/${operationId}/rules-by-price-value/${id}`);
  }

  save(data: OperationRuleByPriceValue, operationId: string): Observable<OperationRuleByPriceValue> {
    return this.http.post<any>(`settings/operations/${operationId}/rules-by-price-value/create`, data);
  }

  update(id: string, data: OperationRuleByPriceValue, operationId: string): Observable<OperationRuleByPriceValue> {
    return this.http.patch<any>(`settings/operations/${operationId}/rules-by-price-value/${id}/update`, data);
  }

  delete(id: string, operationId: string): Observable<void> {
    return this.http.delete<void>(`settings/operations/${operationId}/rules-by-price-value/${id}/delete`);
  }

  getMinimumRedundancyOptions(): Observable<Choice[]> {
    return this.http.get<Choice[]>('settings/rules-by-price/redundancy-minimum');
  }
}
