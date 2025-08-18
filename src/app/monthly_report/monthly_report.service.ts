import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiService, { DEFAULT_LIMIT, GetAllResponse, Pagination } from '../shared/services/api.service';
import { Observable } from 'rxjs';

export interface MonthlyReport {
  totalSmPerPlate: string;
  totalSmPerDriver: string;
  totalSmPerRouteDestiny: string;
  totalSmPerRouteOrigin: string;
  totalNcPerIncidentPercent: string;
  totalSmPerMonth: string;
  totalSmPerLoadTypePercent: string;
  totalSmPerOperationsPercent: string;
  totalSm: string;
  id: string;
  tradingName?: string;
  cnpj?: string;
  startCoverage?: string;
  endCoverage?: string;
  broker?: string;
  insuranceCompany?: string;
}

export interface YearMonthOption {
  year: number;
  month: number;
}

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService implements ApiService<MonthlyReport> {

  constructor(private http: HttpClient) {}

  getAll(pagination: Pagination, filters?: { trading_name?: string }): Observable<GetAllResponse<MonthlyReport>> {
    const params: any = { limit: pagination.limit || DEFAULT_LIMIT };
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.trading_name) {
      params.trading_name = filters.trading_name;
    }
    return this.http.get<GetAllResponse<MonthlyReport>>(`monthly-report`, { params });
  }

  get(id: string): Observable<MonthlyReport> {
    return this.http.get<MonthlyReport>(`monthly-report/${id}`);
  }

  save(item: Omit<MonthlyReport, 'id'>): Observable<MonthlyReport> {
    item.startCoverage = item.startCoverage ? new Date(item.startCoverage).toISOString().split('T')[0] : undefined;
    item.endCoverage = item.endCoverage ? new Date(item.endCoverage).toISOString().split('T')[0] : undefined;
    return this.http.post<MonthlyReport>(`monthly-report/create`, item);
  }

  update(id: string, item: Omit<MonthlyReport, 'id'>): Observable<MonthlyReport> {
    return this.http.patch<MonthlyReport>(`monthly-report/${id}/update`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`monthly-report/${id}/delete`);
  }

  // Novo método para pegar as opções year-month
  getYearMonthOptions(): Observable<YearMonthOption[]> {
    return this.http.get<YearMonthOption[]>(`monthly-report/year-month-options`);
  }

  // Método para buscar relatórios por ano e mês com paginação
  getByYearMonth(year: number, month: number, pagination: Pagination = { limit: DEFAULT_LIMIT }): Observable<GetAllResponse<MonthlyReport>> {
    const params: any = {
      year: year.toString(),
      month: month.toString(),
      limit: pagination.limit || DEFAULT_LIMIT,
      customer_id: 17742

    };
    return this.http.get<GetAllResponse<MonthlyReport>>('monthly-report', { params });
  }
}
