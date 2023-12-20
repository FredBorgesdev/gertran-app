import {Injectable} from '@angular/core';
import ApiService, {
  DEFAULT_LIMIT,
  GetAllResponse,
  Pagination,
} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PersonalPosition {
  id: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class PersonalPositionsService {
  constructor(private http: HttpClient) {
  }

  getAll(
    pagination: Pagination,
    filters?: {
      customer?: string;
    }
  ): Observable<GetAllResponse<PersonalPosition>> {
    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.customer) {
      params.customer = filters.customer;
    }

    return this.http.get<GetAllResponse<PersonalPosition>>('personal_monitoring/devices-positions-list', {params});
  }


}
