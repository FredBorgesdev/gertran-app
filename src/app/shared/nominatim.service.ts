import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, switchMap } from 'rxjs/operators';

// const BASE_URL = 'http://localhost:8033/v1/settings/points/get-lat-lng/?address=';
const BASE_URL = 'https://api2.gertran.zayit.com.br/v1/settings/points/get-lat-lng/?address=';
// Fallback direto no Nominatim público com detalhes do endereço (BR) e limite reduzido
const NOMINATIM_FALLBACK = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=br&q=';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http: HttpClient) {
  }

  query(query: string): Observable<any[]> {
    // Encode the query to avoid breaking the URL with spaces, commas or accents
    const encoded = encodeURIComponent(query ?? '');

    // 1) Tenta a API interna
    // 2) Se falhar ou retornar vazio, tenta o Nominatim público
    return this.http.get<any[]>(`${BASE_URL}${encoded}`).pipe(
      catchError(() => this.http.get<any[]>(`${NOMINATIM_FALLBACK}${encoded}`)),
      switchMap((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          return of(data);
        }
        return this.http.get<any[]>(`${NOMINATIM_FALLBACK}${encoded}`).pipe(
          catchError(() => of([]))
        );
      })
    );
  }
}
