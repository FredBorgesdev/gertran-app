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
import {Permission, PermissionsService} from "../../shared/services/permissions.service";

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
  permissions: Permission[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private permissionsService: PermissionsService,
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
      dashboards: [],
    });
    this.validateForm.valueChanges.subscribe(form => {
      this.update.emit(form);
    });
    this.customersService.getAll({limit: 50}, {isShipper: true}).subscribe((response) => {
      this.shippers = response.results;
    });
    this.permissionsService.getAll().subscribe((response) => {
      this.permissions = response
        .results
        .filter(permission => permission.codename.includes('view_dashboard'))
        .map(permission => ({...permission, id: Number(permission.id)}));

      const customerPermission = this.customer.permissions.filter(
        permission => this.permissions.some(
          p => p.id === permission
        )
      );

      this.validateForm.patchValue({
        dashboards: customerPermission
      });
    });
  }

  listCustomers(): void {
    this.router.navigate(['/customers/customers-list']);
  }
}
