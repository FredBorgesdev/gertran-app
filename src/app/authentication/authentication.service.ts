import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import {from, Observable} from 'rxjs';
import decode from 'jwt-decode';
import { AbstractUser, UsersService } from '../users/users.service';
import User from '../users/user';

export const GERTRAN_CUSTOMER_ID = 'GERTRAN_CUSTOMER_ID';
export const GERTRAN_WEB_TOKEN = 'GERTRAN_WEB_TOKEN';
const GERTRAN_REFRESH_TOKEN = 'GERTRAN_REFRESH_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
  ) { }

  async login(
    cpf: string,
    password: string
  ): Promise<void> {
    return this.http.post('auth/jwt/create', {
      cpf,
      password
    }).toPromise().then((response: any) => {
      Cookies.set(GERTRAN_WEB_TOKEN, response.access);
      Cookies.set(GERTRAN_REFRESH_TOKEN, response.refresh);
    });
  }

  logout(): void {
    Cookies.remove(GERTRAN_WEB_TOKEN);
    Cookies.remove(GERTRAN_REFRESH_TOKEN);
    Cookies.remove(GERTRAN_CUSTOMER_ID);
  }

  setCustomer(customerId: string): void {
    Cookies.set(GERTRAN_CUSTOMER_ID, customerId);
  }

  removeCustomer(): void {
    Cookies.remove(GERTRAN_CUSTOMER_ID);
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

  async init(): Promise<User | null> {
    const jwt = Cookies.get(GERTRAN_WEB_TOKEN);
    if (!jwt) {
      return null;
    }

    const decoded: any = decode(jwt);
    const user = await this.usersService.get(decoded.user_id).toPromise();

    this.user = new User(user);

    if (user.customer.length > 0 && !this.customerId) {
      const selectedCustomer = user.customer[0].id;
      this.setCustomer(selectedCustomer);
      window.location.reload();
    }
  }

  get customerId(): string {
    return Cookies.get(GERTRAN_CUSTOMER_ID);
  }
}
