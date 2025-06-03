import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';
import {Customer} from "../customers/customers.service";

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

  save(insuranceCompany: Omit<Ddr, 'id'>): Observable<Ddr> {
    // TODO: remove when backend is ready
    // delete insuranceCompany.logo;

    insuranceCompany.startCoverage  = insuranceCompany.startCoverage.toISOString().split('T')[0]
    insuranceCompany.endCoverage  = insuranceCompany.endCoverage.toISOString().split('T')[0]

    // insuranceCompany.insuranceCompany = "60994039-874c-4018-99bc-f0784b9cf670"
    console.log(insuranceCompany)

    return this.http.post<Ddr>('settings/ddrs/create', insuranceCompany);
  }

  update(
    id: string,
    insuranceCompany: Omit<Ddr, 'id'>
  ): Observable<Ddr> {
    // TODO: remove when backend is ready
    // delete insuranceCompany.logo;

    return this.http.patch<Ddr>(`settings/ddrs/${id}/update`, insuranceCompany);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/ddrs/${id}/delete`);
  }

  // getCustomers(): Observable<GetAllResponse<Customer>> {
  //   return this.http.get<GetAllResponse<Customer>>('ddrs/customers', {
  //     params: {
  //       limit: 999
  //     }
  //   });
  // }
}
