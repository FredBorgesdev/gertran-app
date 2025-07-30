import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import { Observable } from 'rxjs';

export interface RiskArea {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius_risk_area: number;
  point_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class RiskAreaService implements ApiService<RiskArea> {

  constructor(private http: HttpClient) {}

  getAll(pagination: Pagination, filters?: { trading_name?: string, customer?: string }): Observable<GetAllResponse<RiskArea>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.trading_name) {
      params.trading_name = filters.trading_name;
    }

    if (filters?.customer) {
      params.customer=filters?.customer
    }
    return this.http.get<GetAllResponse<RiskArea>>(`customers/risk-area`, { params });
  }

  get(id: string): Observable<RiskArea> {
    return this.http.get<RiskArea>(`customers/risk-area/${id}`);
  }

  save(item: Omit<RiskArea, 'id'>): Observable<RiskArea> {
    return this.http.post<RiskArea>(`customers/risk-area/create`, item);
  }

  update(id: string, item: Omit<RiskArea, 'id'>): Observable<RiskArea> {
    return this.http.patch<RiskArea>(`customers/risk-area/${id}/update`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`customers/risk-area/${id}/delete`);
  }
}
