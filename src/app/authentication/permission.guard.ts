import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private message: NzMessageService,
    private router: Router,
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasPermission = this.authService.user.hasPermission(childRoute.data.permission);
    if (hasPermission || !childRoute.data.permission) {
      return true;
    }

    // this.message.error('Você não tem permissão para acessar esta página');
    this.router.navigate(['authentication/forbidden']);
  }
}
