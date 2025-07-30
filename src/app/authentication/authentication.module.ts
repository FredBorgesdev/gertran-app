import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForbiddenErrorComponent } from './forbidden/forbidden-error.component';
import { Error2Component } from './error-2/error-2.component';
import {TextMaskModule} from 'angular2-text-mask';
import { FirstAccessComponent } from './first-access/first-access.component';
import {PasswordStrengthMeterModule} from 'angular-password-strength-meter';
import { MagicLoginComponent } from './magic-login/magic-login.component';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ...antdModule,
    TextMaskModule,
    PasswordStrengthMeterModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForbiddenErrorComponent,
    Error2Component,
    FirstAccessComponent,
    MagicLoginComponent,
  ]
})

export class AuthenticationModule {}
