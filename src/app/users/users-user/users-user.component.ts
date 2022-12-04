import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {AbstractUser, UsersService} from '../users.service';
import {FormBuilder, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-users-user',
  templateUrl: './users-user.component.html',
  styleUrls: ['./users-user.component.css']
})
export class UsersUserComponent extends BaseCrudFormComponent<AbstractUser> {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
      customer: [null, Validators.required],
      email: [null, [Validators.email]],
      cpf: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, []],
      isActive: [false, [Validators.required]],
      isAdmin: [false, [Validators.required]],
      isSuperuser: [false, [Validators.required]],
    });
  }

  list(): void {
    this.router.navigate(['users', 'users-list']);
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
}
