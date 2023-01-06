import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {AbstractUser, UsersService} from '../users.service';
import {FormBuilder, Validator, Validators} from '@angular/forms';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-users-user',
  templateUrl: './users-user.component.html',
  styleUrls: ['./users-user.component.css']
})
export class UsersUserComponent extends BaseCrudFormComponent<AbstractUser> {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    service: UsersService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      customer: [[this.authService.customerId], []],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, []],
      isActive: [true, []],
      isGertranStaff: [false, []],
    });
  }

  list(): void {
    this.router.navigate(['users', 'users-list']);
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues();

    this.validateForm.patchValue({
      customer: this.resource.customer?.map(c => c.id),
    });
  }

  changePassword(password: string): void {
    (this.service as UsersService).changePassword(this.resource.id, password).subscribe(() => {
      this.message.success('Senha alterada com sucesso!');
    }, () => {
      this.message.error('Não foi possível alterar a senha. Tente novamente.');
    });
  }

  updateField(field: string, value: any): void {
    this.resource[field] = value;
    this.service.update(this.resource.id, this.resource).subscribe(() => {
      this.message.success('Campo salvo com sucesso!');
    }, () => {
      this.message.error('Não foi possível salvar o campo. Tente novamente.');
    });
  }

  numbersToStrings(numbers?: number[]): string[] {
    return numbers?.map(String) ?? [];
  }

  getValues(): AbstractUser {
    return {
      ...super.getValues(),
      cpf: this.validateForm.controls.cpf.value.replace(/\D/g, ''),
    };
  }

  updateResource(user: AbstractUser): void {
    this.resource = user;
  }
}
