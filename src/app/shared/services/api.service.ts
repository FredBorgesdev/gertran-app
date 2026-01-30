import { Observable } from 'rxjs';

export const DEFAULT_LIMIT = 15;

export interface Pagination {
  url?: string;
  limit?: number;
  offset?: number;
}

export interface GetAllResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
  limit: number;
  offset: number;
}

export interface Choice {
  value: string;
  label: string;
}

export const getCurrentPage = (response: GetAllResponse<any>) => {
  if (!response || response.offset === 0) { return 1; }
  return response.offset / response.limit + 1;
};

export const replaceOffsetWithPage = (url: string, page: number): string => {
  const limit = +url.match(/limit=\d+/)[0].split('=')[1];

  return url.replace(/offset=\d+/, `offset=${(limit * page) - limit}`);
};

interface ApiService<T> {
  get(id: string, ...params: any): Observable<T>;
  getAll(pagination: Pagination, ...params: any): Observable<GetAllResponse<T>>;
  save(data: T, ...params: any): Observable<T>;
  update(id: string, data: T, ...params: any): Observable<T>;
  delete(id: string, ...params: any): Observable<void>;
}

export default ApiService;
