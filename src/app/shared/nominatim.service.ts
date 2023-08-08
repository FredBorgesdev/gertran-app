import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const BASE_URL = 'https://api.gertran.zayit.com.br/settings/points/get-lat-lng?address=';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http: HttpClient) {
  }

  query(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}${query}`);
  }
}
