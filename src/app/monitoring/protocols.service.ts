import {Injectable} from '@angular/core';
import ApiService, {
  DEFAULT_LIMIT,
  GetAllResponse,
  Pagination,
} from '../shared/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Protocol {
  created_at: string;
  picture_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProtocolsService {
  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<GetAllResponse<Protocol>> {
    return this.http.get<GetAllResponse<Protocol>>(`monitoring/monitoring-requests/mobile-pictures`,{ params:{
      'monitoring_request_id':id
      // 'customer_id':'1e720bda-169e-4e87-ac85-5ec56e8036ee'
      // 'driver_id': '98909ecd-17d3-4338-8a09-c548d36938e1'
    }});
  }

}