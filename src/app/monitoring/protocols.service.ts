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
    return this.http.get<GetAllResponse<Protocol>>(`monitoring/monitoring-requests/${id}/mobile-pictures`);
  }

}