import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringRequestHistoryService {
  constructor(private http: HttpClient) {}

  getMonitoringRequestHistory(id: string): Observable<any[]> {
    return this.http.get<any[]>(`monitoring/monitoring-requests/${id}/history`); // URL da API
  }
}
