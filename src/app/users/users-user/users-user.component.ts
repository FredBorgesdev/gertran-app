import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {User, UsersService} from '../users.service';
import {FormBuilder, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-users-user',
  templateUrl: './users-user.component.html',
  styleUrls: ['./users-user.component.css']
})
export class UsersUserComponent extends BaseCrudFormComponent<User> {
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
      email: [null, [Validators.required, Validators.email]],
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
}
