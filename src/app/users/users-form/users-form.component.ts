import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractUser, UsersService} from '../users.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
  providers: [SelectableCustomerServiceService],
})
export class UsersFormComponent implements OnInit {
  isChangePasswordModalVisible = false;
  validatePasswordForm: FormGroup;

  @Input() user: AbstractUser;
  @Input() formGroup: FormGroup;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() list: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePassword: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateResource = new EventEmitter<AbstractUser>();

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    private formBuilder: FormBuilder,
    public selectableCustomerService: SelectableCustomerServiceService,
    public authService: AuthenticationService,
    private service: UsersService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.validatePasswordForm = formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.selectableCustomerService.init();
    if (this.user?.customer) {
      this.selectableCustomerService.concatCustomers(this.user.customer);
    }
  }

  submitPassword(): void {
    if (this.validatePasswordForm.valid) {
      this.changePassword.emit(this.validatePasswordForm.controls.password.value);
      this.isChangePasswordModalVisible = false;
    }
  }

  getUserByCpf(): void {
    const cpf = this.formGroup.controls.cpf.value;
    if (!cpf) {
      return;
    }

    const rawCpf = cpf.replace(/\D/g, '');
    this.service.getByCpf(rawCpf).subscribe((user) => {
      this.updateResource.emit(user);
      const customerIds = user.customer.map((customer) => customer.id);
      this.selectableCustomerService.concatCustomers(user.customer);
      this.formGroup.patchValue({
        ...user,
        customer: (this.formGroup.controls.customer.value || []).concat(customerIds),
      });
    }, () => {
      this.message.error('Não foi possível encontrar o usuário.');
    });
  }

  backToCustomerList(): void {
      this.router.navigate(['customers', 'customers-edit', this.activatedRoute.snapshot.paramMap.get('customer_id')]);
  }


}
