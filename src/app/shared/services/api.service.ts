import { Observable } from "rxjs";

interface ApiService<T> {
  get(id: string): Observable<T>;
  getAll(): Observable<T[]>;
  save(data: T): Observable<T>;
  update(id: string, data: T): Observable<T>;
  delete(id: string): Observable<T>;
}

export default ApiService
