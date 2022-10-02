import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import {from, Observable} from 'rxjs';

export const GERTRAN_WEB_TOKEN = 'GERTRAN_WEB_TOKEN';
const GERTRAN_REFRESH_TOKEN = 'GERTRAN_REFRESH_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  async login(
    email: string,
    password: string
  ): Promise<void> {
    return this.http.post('auth/jwt/create', {
      email,
      password
    }).toPromise().then((response: any) => {
      Cookies.set(GERTRAN_WEB_TOKEN, response.access);
      Cookies.set(GERTRAN_REFRESH_TOKEN, response.refresh);
    });
  }

  logout(): void {
    Cookies.remove(GERTRAN_WEB_TOKEN);
    Cookies.remove(GERTRAN_REFRESH_TOKEN);
  }

  async refresh(): Promise<boolean> {
    const refreshToken = Cookies.get(GERTRAN_REFRESH_TOKEN);
    if (!refreshToken) {
      return false;
    }

    return this.http.post('auth/jwt/refresh', {
      refresh: refreshToken
    }).toPromise().then((response: any) => {
      Cookies.set(GERTRAN_WEB_TOKEN, response.access);
      return true;
    }).catch(() => false);
  }

  refreshObservable(): Observable<boolean> {
    return from(this.refresh());
  }

  async isAuthenticated(): Promise<boolean> {
    const token = Cookies.get(GERTRAN_WEB_TOKEN);
    if (!token) { return false; }

    const isTokenValid = await this.http.post('auth/jwt/verify', {
      token: Cookies.get(GERTRAN_WEB_TOKEN)
    }).toPromise().catch(async () => {
      const isRefreshed = await this.refresh();
      if (isRefreshed) {
        return true;
      }

      this.logout();
      return false;
    });

    return !!isTokenValid;
  }
}
