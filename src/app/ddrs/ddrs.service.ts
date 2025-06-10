import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';

export interface Ddr {
      id: string,
      tradingName,
      cnpj,
      startCoverage,
      endCoverage,
      broker,
      insuranceCompany,
}

@Injectable({
  providedIn: 'root'
})
export class DdrsService implements ApiService<Ddr> {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(pagination: Pagination,     
    filters?: {
      name?: string;
    }): Observable<GetAllResponse<Ddr>> {
    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }


    if (filters?.name) {
      params.trading_name = filters.name;
    }

    return this.http.get<GetAllResponse<Ddr>>('settings/ddrs', {params});
  }

  get(id: string): Observable<Ddr> {
    return this.http.get<Ddr>(`settings/ddrs/${id}`);
  }

  save(ddr: Omit<Ddr, 'id'>): Observable<Ddr> {
    ddr.startCoverage  = ddr.startCoverage.toISOString().split('T')[0]
    ddr.endCoverage  = ddr.endCoverage.toISOString().split('T')[0]
    console.log(ddr)

    return this.http.post<Ddr>('settings/ddrs/create', ddr);
  }

  update(
    id: string,
    ddr: Omit<Ddr, 'id'>
  ): Observable<Ddr> {
    return this.http.patch<Ddr>(`settings/ddrs/${id}/update`, ddr);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/ddrs/${id}/delete`);
  }


  search(pagination: Pagination, search?: string): Observable<GetAllResponse<Ddr>> {
    const params = this.getAllParams(pagination, { search });
    return this.http.get<GetAllResponse<Ddr>>('settings/ddrs/search', { params });
  }


  private getAllParams(pagination: Pagination, filters?: { search?: string }): any {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.search) {
      params.search = filters.search;
    }
    return params;
  }

}
