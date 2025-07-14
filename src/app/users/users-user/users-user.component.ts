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
  customerLoadedTab = []
  userLoadedTab = null
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthenticationService,
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
    const customerLoaded = [this.authService.customerId, this.activatedRoute.snapshot.paramMap.get('customer_id')]
    this.customerLoadedTab = customerLoaded
    this.validateForm = this.formBuilder.group({
      customer: [customerLoaded, []],
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
    try {
      this.userLoadedTab = this.resource.id
    } catch (error) {}
  }

  changePassword(password: string): void {
    (this.service as UsersService).changePassword(this.resource.id, password).subscribe(() => {
      this.message.success('Senha alterada com sucesso!');
    }, () => {
      this.message.error('Não foi possível alterar a senha. Tente novamente.');
    });
  }

  updateField(field: string, value: any): void {
    const resource = this.resource;
    const newResource = Object.assign({}, resource);
    newResource.customer = this.resource.customer.map(({ id }) => id) as any;
    newResource[field] = value;

    if(field == 'groups')
      delete newResource['permissions']

    if(field == 'permissions')
      delete newResource['groups']
    
    this.service.update(this.resource.id, newResource).subscribe(() => {
      this.message.success('Campo salvo com sucesso!');
      }, () => {
      this.message.error('Não foi possível salvar o campo. Tente novamente.');
    });
  }

  numbersToStrings(numbers?: number[]): string[] {
    return numbers?.map(String) ?? [];
  }

  numbersToStringsGroup(numbers?: number[]): string[] {
    return numbers?.map(x=>x['id'].toString()) ?? [];
  }

  getValues(): AbstractUser {
    return {
      ...super.getValues(),
      cpf: this.validateForm.controls.cpf.value.replace(/\D/g, ''),
      customer: this.validateForm.controls.customer.value?.filter(Boolean)
    };
  }

  updateResource(user: AbstractUser): void {
    this.resource = user;
  }
  
  handleSuccess(response?: any): void {
    this.message.success('Registro salvo com sucesso');
    this.isLoading = false
    }
}
