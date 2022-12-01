import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../customers.service';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
  cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  @Input() customer: Customer = null;
  @Output() onSave: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() onChange: EventEmitter<Customer> = new EventEmitter<Customer>();

  validateForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  save(): void {
    if (this.validateForm.valid) {
      this.onSave.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      corporateName: [this.customer?.corporateName, Validators.required],
      tradingName: [this.customer?.tradingName, Validators.required],
      cnpj: [this.customer?.cnpj, [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)]],
      domain: [this.customer?.domain, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      checklistExpirationPeriod: [this.customer?.checklistExpirationPeriod, Validators.required],
      itambeShipper: [false],
      lactalisShipper: [false]
    });
    this.validateForm.valueChanges.subscribe(form => {
      this.onChange.emit(form);
    });
  }

  listCustomers() {
    this.router.navigate(['/customers/customers-list']);
  }
}
