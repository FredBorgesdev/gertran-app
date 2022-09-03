import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

const GERTRAN_WEB_TOKEN = 'GERTRAN_WEB_TOKEN'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(
    email: string,
    password: string
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Cookies.set(GERTRAN_WEB_TOKEN, '1234567890');
        resolve(true);
      }, 500)
    })
  }

  logout() {}

  isAuthenticated() {
    return Boolean(Cookies.get(GERTRAN_WEB_TOKEN));
  }
}
