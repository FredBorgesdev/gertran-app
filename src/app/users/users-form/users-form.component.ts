import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractUser} from '../users.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: [ './users-form.component.css' ]
})
export class UsersFormComponent implements OnInit {
  isChangePasswordModalVisible = false;
  validatePasswordForm: FormGroup;

  @Input() user: AbstractUser;
  @Input() formGroup: FormGroup;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() list: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePassword: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    public selectableCustomerService: SelectableCustomerServiceService,
    public authService: AuthenticationService,
  ) {
    this.validatePasswordForm = formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.selectableCustomerService.init();
    if (this.user?.customer) {
      this.selectableCustomerService.appendCustomer(this.user.customer[0]);
    }
  }

  submitPassword(): void {
    if (this.validatePasswordForm.valid) {
      this.changePassword.emit(this.validatePasswordForm.controls.password.value);
      this.isChangePasswordModalVisible = false;
    }
  }
}
