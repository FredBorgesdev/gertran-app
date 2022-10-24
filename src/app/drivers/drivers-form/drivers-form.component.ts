import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { conformToMask } from 'angular2-text-mask';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { Customer, CustomersService } from 'src/app/customers/customers.service';
import {Driver, DriversService} from '../drivers.service';
import {Choice} from '../../shared/services/api.service';

@Component({
  selector: 'app-drivers-form',
  templateUrl: './drivers-form.component.html',
  styleUrls: ['./drivers-form.component.css']
})
export class DriversFormComponent implements OnInit {
  workingSituations: Choice[] = [];

  @Input() driver: Driver;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  validateForm: FormGroup;
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  customers: Customer[] = [];
  isLoadingMoreData = false;
  customersNextUrl: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private i18n: NzI18nService,
    private service: DriversService,
  ) { }

  ngOnInit(): void {
    const { conformedValue: maskedCpf } = conformToMask(this.driver?.cpf, this.cpfMask, { guide: false });

    this.validateForm = this.formBuilder.group({
      customers: [this.driver?.customers, [Validators.required]],
      workingSituation: [this.driver?.workingSituation, []],
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
    });

    this.loadMoreCustomers();

    if (this.driver.customers) {
      this.customers = this.customers.concat(this.driver.customers);
      this.validateForm.patchValue({
        customers: this.driver.customers.map((customer) => customer.id)
      });
    }

    // this.service.getWorkingSituations().subscribe((workingSituations) => {
    //   this.workingSituations = workingSituations;
    // });

    this.i18n.setLocale(en_US);
  }

  save(): void {
    if (this.validateForm.valid) {
      this.onSubmit.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  listDrivers(): void {
    this.router.navigate(['/drivers/drivers-list']);
  }

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customersService.getAll({
      limit: 999,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
    });
  }
}
