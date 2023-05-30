import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Customer, CustomersService} from '../customers.service';
import {conformToMask} from 'angular2-text-mask';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
  cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  @Input() customer: Customer = null;
  @Output() save: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() update: EventEmitter<Customer> = new EventEmitter<Customer>();

  validateForm: FormGroup;
  shippers: Customer[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customersService: CustomersService
  ) {
  }

  saveCustomer(): void {
    if (this.validateForm.valid) {
      this.save.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  ngOnInit(): void {
    const {conformedValue: maskedCnpj} = conformToMask(
      this.customer?.cnpj,
      this.cnpjMask,
      {guide: false}
    );

    this.validateForm = this.formBuilder.group({
      corporateName: [this.customer?.corporateName, Validators.required],
      tradingName: [this.customer?.tradingName, Validators.required],
      cnpj: [maskedCnpj, [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)]],
      email: [this.customer?.email, [Validators.email]],
      checklistExpirationPeriod: [this.customer?.checklistExpirationPeriod, Validators.required],
      shippers: [this.customer.shippers],
      closingDay: [this.customer?.closingDay, []],
    });
    this.validateForm.valueChanges.subscribe(form => {
      this.update.emit(form);
    });
    this.customersService.getAll({limit: 50}, {isShipper: true}).subscribe((response) => {
      this.shippers = response.results;
    });
  }

  listCustomers(): void {
    this.router.navigate(['/customers/customers-list']);
  }
}
