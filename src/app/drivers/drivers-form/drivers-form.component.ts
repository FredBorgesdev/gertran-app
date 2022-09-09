import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { conformToMask } from 'angular2-text-mask';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { Customer, CustomersService } from 'src/app/customers/customers.service';
import { Driver } from '../drivers.service';

@Component({
  selector: 'app-drivers-form',
  templateUrl: './drivers-form.component.html',
  styleUrls: ['./drivers-form.component.css']
})
export class DriversFormComponent implements OnInit {

  @Input() driver: Driver
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  validateForm: FormGroup
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  customers: Customer[] = []

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private i18n: NzI18nService
  ) { }

  ngOnInit(): void {
    const { conformedValue: maskedCpf } = conformToMask(this.driver?.cpf, this.cpfMask, { guide: false })

    this.validateForm = this.formBuilder.group({
      customer: [this.driver?.customer, [Validators.required]],
      workingSituation: [this.driver?.workingSituation, [Validators.required]],
      name: [this.driver?.name, [Validators.required]],
      rg: [this.driver?.rg, [Validators.required]],
      cpf: [maskedCpf, [Validators.required, Validators.pattern('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}')]],
      cnhNumber: [this.driver?.cnhNumber, [Validators.required]],
      cnhCategory: [this.driver?.cnhCategory, [Validators.required]],
      cnhValidity: [this.driver?.cnhValidity, [Validators.required]],
      cnhIssuer: [this.driver?.cnhIssuer, [Validators.required]],
      cnhIssuerUf: [this.driver?.cnhIssuerUf, [Validators.required]],
      cnhFirstIssue: [this.driver?.cnhFirstIssue, [Validators.required]],
      cnhEmission: [this.driver?.cnhEmission, [Validators.required]],
      admissionDate: [this.driver?.admissionDate, [Validators.required]],
    })

    this.customersService.getAll().subscribe((customers) => {
      this.customers = customers
    })

    this.i18n.setLocale(en_US)
  }

  save() {
    console.log(this.validateForm.get('cpf').value)
    if (this.validateForm.valid) {
      this.onSubmit.emit(this.validateForm.value)
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      })
    }
  }

  listDrivers() {
    this.router.navigate(['/drivers/drivers-list'])
  }
}
