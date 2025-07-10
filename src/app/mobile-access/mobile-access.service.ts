import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import { Observable } from 'rxjs';
import {format} from 'date-fns';

export interface MobileAccess {
  id: string;
  tradingName?: string;
  cnpj?: string;
  startAt?: string;
  endAt?: string;
  broker?: string;
  insuranceCompany?: string;

  groupMobileAccess?: {
    id: string;
    // outros campos, se houver
  };

  user?: {
    id: string;
    // outros campos, se houver
  };

  customer?: {
    id: string;
    // outros campos, se houver
  };

  choiseChargeType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MobileAccessService implements ApiService<MobileAccess> {

  constructor(private http: HttpClient) {}

  getAll(pagination: Pagination, filters?: { trading_name?: string }): Observable<GetAllResponse<MobileAccess>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.trading_name) {
      params.trading_name = filters.trading_name;
    }
    return this.http.get<GetAllResponse<MobileAccess>>(`mobile-access`, { params });
  }

  get(id: string): Observable<MobileAccess> {
    return this.http.get<MobileAccess>(`mobile-access/${id}`);
  }

  save(item: Omit<MobileAccess, 'id'>): Observable<MobileAccess> {
    return this.http.post<MobileAccess>(`mobile-access/create`, item);
  }

  update(id: string, item: Omit<MobileAccess, 'id'>): Observable<MobileAccess> {
    return this.http.patch<MobileAccess>(`mobile-access/${id}/update`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`mobile-access/${id}/delete`);
  }
}
