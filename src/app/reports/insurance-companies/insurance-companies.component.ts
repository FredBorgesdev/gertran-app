import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Customer, CustomersService} from '../../customers/customers.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {InsuranceCompaniesService, InsuranceCompany} from '../../insurance-companies/insurance-companies.service';

@Component({
  selector: 'app-insurance-companies',
  templateUrl: './insurance-companies.component.html',
  styleUrls: ['./insurance-companies.component.css']
})
export class InsuranceCompaniesComponent implements OnInit {
  isLoading = false;
  validateForm: FormGroup;

  customers: Customer[] = [];
  insuranceCompanies: InsuranceCompany[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private insuranceCompanyService: InsuranceCompaniesService,
    private i18n: NzI18nService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      startDate: [null],
      endDate: [null],
      insuranceCompany: [null],
      customer: [null],
      incidentType: [null],
    });

    this.customerService.getAll({ limit: 50 }).subscribe((response) => {
      this.customers = response.results;
    });
    this.insuranceCompanyService.getAll({ limit: 50 }).subscribe((response) => {
      this.insuranceCompanies = response.results;
    });

    this.i18n.setLocale(en_US);
  }

  emitGenerateReport(): void {
  }
}
