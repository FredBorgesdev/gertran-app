import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ApiService, { GetAllResponse, Pagination, DEFAULT_LIMIT } from '../shared/services/api.service';

export interface RiskArea {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius_risk_area: number;
  customer: any;
  pointType: string;
}

@Injectable({
  providedIn: 'root',
})
export class RiskAreaService implements ApiService<RiskArea> {
  private readonly endpoint = 'customers/risk-area';

  constructor(private http: HttpClient) {}
  get(id: string, ...params: any): Observable<RiskArea> {
    throw new Error('Method not implemented.');
  }
  save(data: RiskArea, ...params: any): Observable<RiskArea> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: RiskArea, ...params: any): Observable<RiskArea> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ...params: any): Observable<void> {
    throw new Error('Method not implemented.');
  }

  getAll(pagination: Pagination, filters?:{customer:string}): Observable<GetAllResponse<RiskArea>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    if(filters.customer != undefined){
      params.customer = filters.customer
    }

    return this.http.get<GetAllResponse<RiskArea>>(this.endpoint, { params });
  }
}
