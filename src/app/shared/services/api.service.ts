import { Observable } from "rxjs";

interface ApiService<T> {
  get(id: string, ...params: any): Observable<T>;
  getAll(...params: any): Observable<T[]>;
  save(data: T, ...params: any): Observable<T>;
  update(id: string, data: T, ...params: any): Observable<T>;
  delete(id: string, ...params: any): Observable<T>;
}

export default ApiService
