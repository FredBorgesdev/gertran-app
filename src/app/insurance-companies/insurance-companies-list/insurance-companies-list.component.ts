import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InsuranceCompaniesService, InsuranceCompany } from '../insurance-companies.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-insurance-companies-list',
  templateUrl: './insurance-companies-list.component.html',
  styleUrls: ['./insurance-companies-list.component.css']
})
export class InsuranceCompaniesListComponent extends BaseCrudListComponent<InsuranceCompany> {

  insuranceCompaniesColumns = [
    { title: 'ID' },
    {
      title: 'Nome',
      compare: (
        a: InsuranceCompany,
        b: InsuranceCompany
      ) => a.name.localeCompare(b.name),
    },
    { title: 'Telefone' },
    {
      title: 'Email',
      compare: (
        a: InsuranceCompany,
        b: InsuranceCompany
      ) => a.email.localeCompare(b.email),
    },
    { title: 'Site' },
    { title: 'Ações' },
  ];

  constructor(
    insuranceCompaniesService: InsuranceCompaniesService,
    router: Router,
    modal: NzModalService,
    message: NzMessageService
  ) {
    super(
      'insurance-companies',
      router,
      insuranceCompaniesService,
      message,
      modal,
    );
  }
}
