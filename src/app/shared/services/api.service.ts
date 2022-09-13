import { Observable } from 'rxjs';

export const DEFAULT_LIMIT = 2;

export interface Pagination {
  url?: string;
}

export interface GetAllResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
  limit: number;
  offset: number;
}

export const getCurrentPage = (response: GetAllResponse<any>) => {
  if (!response || response.offset === 0) { return 1; }
  return response.offset / response.limit + 1;
};

interface ApiService<T> {
  get(id: string, ...params: any): Observable<T>;
  getAll(pagination: Pagination, ...params: any): Observable<GetAllResponse<T>>;
  save(data: T, ...params: any): Observable<T>;
  update(id: string, data: T, ...params: any): Observable<T>;
  delete(id: string, ...params: any): Observable<T>;
}

export default ApiService;
