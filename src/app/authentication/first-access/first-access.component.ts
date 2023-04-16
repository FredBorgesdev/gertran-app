import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { zxcvbn } from 'zxcvbn3';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.css']
})
export class FirstAccessComponent implements OnInit {
  isLoading = false;
  validateForm: FormGroup;

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private message: NzMessageService,
  ) {}

  async submitForm(): Promise<void> {
    for (const control of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[control].markAsDirty();
      this.validateForm.controls[control].updateValueAndValidity();
    }

    if (!this.validateForm.valid) {
      return;
    }

    this.isLoading = true;
    this.authService.createFirstAccess({
      ...this.validateForm.value,
      cpf: this.validateForm.value.cpf.replace(/\D/g, ''),
    }).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (e) => {
      this.isLoading = false;
      this.message.error(e.error.detail || e.error.message);
    });
  }

  async ngOnInit(): Promise<void> {
    this.validateForm = this.formBuilder.group({
      cpf: [null, [Validators.required]],
      legacyLogin: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
