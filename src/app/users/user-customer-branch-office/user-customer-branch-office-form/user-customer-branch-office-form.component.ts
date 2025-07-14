import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCustomerBranchOffice, UserCustomerBranchOfficeService } from '../../user-customer-branch-office.service';
import { Customer } from 'src/app/customers/customers.service';
import { AbstractUser } from '../../users.service';

@Component({
  selector: 'app-user-customer-branch-office-form',
  templateUrl: './user-customer-branch-office-form.component.html',
  styleUrls: ['./user-customer-branch-office-form.component.css']
})
export class UserCustomerBranchOfficeFormComponent implements OnInit {

  @Input() userCustomerBranchOffice: UserCustomerBranchOffice = null;
  @Input() isVisible = false;

  @Input() customerLoaded = null;
  @Input() userLoaded = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<UserCustomerBranchOffice>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.validateForm = this.formBuilder.group({
      user: [this.userCustomerBranchOffice?.user?.id  || this.userLoaded, [Validators.required]],
      customer: [this.userCustomerBranchOffice?.customer?.id|| this.customerLoaded , [Validators.required]],
      branch_office: [this.userCustomerBranchOffice?.branch_office?.id, [Validators.required]],
    });
  }

  handleOk() {
    if (this.validateForm.valid) {
      this.onSubmit.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  handleCancel() {
    this.onClose.emit();
  }

  onCustomerChange(customer: Customer | 'all') {
    this.validateForm.patchValue({
      customer: customer === 'all' ? 'all' : customer?.id,
    });
  }

  onBranchOfficeChange(customer: Customer | 'all') {
    this.validateForm.patchValue({
      branch_office: customer === 'all' ? 'all' : customer?.id,
    });
  }

  onUserSelected(user: AbstractUser | 'all') {
    this.validateForm.patchValue({
      user: user === 'all' ? 'all' : user?.id
    });
  }
}
