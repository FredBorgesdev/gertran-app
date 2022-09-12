import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

const GERTRAN_WEB_TOKEN = 'GERTRAN_WEB_TOKEN'
const GERTRAN_REFRESH_TOKEN = 'GERTRAN_REFRESH_TOKEN'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  async login(
    email: string,
    password: string
  ) {
    return this.http.post('auth/jwt/create', {
      email,
      password 
    }).toPromise().then((response: any) => {
      Cookies.set(GERTRAN_WEB_TOKEN, response.access);
      Cookies.set(GERTRAN_REFRESH_TOKEN, response.refresh);
    })
  }

  logout() {
    Cookies.remove(GERTRAN_WEB_TOKEN);
    Cookies.remove(GERTRAN_REFRESH_TOKEN);
  }

  async isAuthenticated() {
    const token = Cookies.get(GERTRAN_WEB_TOKEN);
    if (!token) return false;

    const isTokenValid = await this.http.post('auth/jwt/verify', {
      token: Cookies.get(GERTRAN_WEB_TOKEN)
    }).toPromise().catch(() => {
        this.logout()
        return false
      });

    return isTokenValid
  }
}
