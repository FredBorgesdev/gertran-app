import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

// const BASE_URL = 'http://localhost:8033/v1/settings/points/get-lat-lng/?address=';
const BASE_URL = 'https://api2.gertran.zayit.com.br/v1/settings/points/get-lat-lng/?address=';

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
