import {Injectable} from '@angular/core';
import ApiService, {
  DEFAULT_LIMIT,
  GetAllResponse,
  Pagination,
} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ClosingCustomersService {
  constructor(private http: HttpClient) {
  }


  getAll(
    pagination: Pagination,
    filters?: {
      closing_day?: string;
      start_date?: string;
      end_date?: string;
    }
  ): Observable<any> {


    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.closing_day) {
      params.closing_day = filters.closing_day;
    }
    if (filters?.start_date) {
      params.start_date = filters.start_date;
    }
    if (filters?.end_date) {
      params.end_date = filters.end_date;
    }

    return this.http.get<any>('customers/closing-customer', {params});
  }



}
