import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    if (isAuthenticated) { return true; }
    const isRefreshed = await this.authService.refresh();
    if (isRefreshed) { return true; }

    this.router.navigate(['/authentication/login']);
  }
}
