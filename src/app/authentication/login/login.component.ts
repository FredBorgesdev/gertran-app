import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../authentication.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private message: NzMessageService,
  ) {}

  async submitForm(): Promise<void> {
    for (const control in this.loginForm.controls) {
      this.loginForm.controls[control].markAsDirty();
      this.loginForm.controls[control].updateValueAndValidity();
    }

    if (!this.loginForm.valid) { return; }

    this.isLoading = true;
    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.router.navigate(['/dashboard/home']);
    } catch (error) {
      this.message.error('Email ou senha inválidos.');
    } finally {
      this.isLoading = false;
    }
  }

  async ngOnInit(): Promise<void> {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard/home']);
    }
  }
}
