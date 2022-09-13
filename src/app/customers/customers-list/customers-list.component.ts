import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';

import { TableService } from '../../shared/services/table.service';
import { Customer, CustomersService } from '../customers.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent extends BaseCrudListComponent<Customer> {
  searchInput: string;

  customerColumn = [
    {
      title: 'Nome Fantasia',
      compare: (a: Customer, b: Customer) => a.tradingName.localeCompare(b.tradingName)
    },
    {
      title: 'Razão Social',
      compare: (a: Customer, b: Customer) => a.corporateName.localeCompare(b.corporateName)
    },
    {
      title: 'CNPJ'
    },
    {
      title: 'Site'
    },
    {
      title: 'Ações'
    }
  ];

  constructor(
    private tableService: TableService,
    router: Router,
    customersService: CustomersService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'customers',
      router,
      customersService,
      message,
      modal,
    );
  }

  loadResources(url?: string): void {
    this.isLoading = true;
    this.service.getAll({ url }).subscribe((data) => {
      this.isLoading = false;
      this.resources = data;
    }, () => this.handleError());
  }

  search(): void {
    const data = this.resources;
    this.resources.results = this.tableService.search(this.searchInput, data.results);
  }

  private handleError(): void {
    this.isLoading = false;
    this.message.error('Erro ao carregar lista de clientes');
  }
}
