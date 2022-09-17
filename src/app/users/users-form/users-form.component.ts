import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: [ './users-form.component.css' ]
})
export class UsersFormComponent {
  isChangePasswordModalVisible = false;
  validatePasswordForm: FormGroup;

  @Input() user: User;
  @Input() formGroup: FormGroup;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() list: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePassword: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.validatePasswordForm = formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  submitPassword(): void {
    if (this.validatePasswordForm.valid) {
      this.changePassword.emit(this.validatePasswordForm.controls.password.value);
      this.isChangePasswordModalVisible = false;
    }
  }
}
