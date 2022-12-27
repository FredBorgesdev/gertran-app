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

    const passwordStrength = zxcvbn(this.validateForm.value.password);
    if (passwordStrength.score < 3) {
      this.message.error('Senha fraca. Tente outra.');
    }
  }

  async ngOnInit(): Promise<void> {
    this.validateForm = this.formBuilder.group({
      cpf: [null, [Validators.required]],
      legacyLogin: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
