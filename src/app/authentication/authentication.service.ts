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

  logout() {}

  isAuthenticated() {
    return Boolean(Cookies.get(GERTRAN_WEB_TOKEN));
  }
}
