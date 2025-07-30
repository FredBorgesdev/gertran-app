import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForbiddenErrorComponent } from './forbidden/forbidden-error.component';
import { Error2Component } from './error-2/error-2.component';
import {FirstAccessComponent} from './first-access/first-access.component';
import { MagicLoginComponent } from './magic-login/magic-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'first-access',
    component: FirstAccessComponent,
    data: {
      title: 'First access'
    }
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: {
      title: 'Sign Up'
    }
  },
  {
    path: 'forbidden',
    component: ForbiddenErrorComponent,
    data: {
      title: 'Forbidden'
    }
  },
  {
    path: 'error-2',
    component: Error2Component,
    data: {
      title: 'Error 2'
    }
  },
  { path: 'magic-login', 
    component: MagicLoginComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthenticationRoutingModule { }
