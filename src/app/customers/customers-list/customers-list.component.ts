import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';

import { TableService } from '../../shared/services/table.service'
import { Customer, CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  isLoading = false
  customers: GetAllResponse<Customer> = null
  searchInput: string

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
  ]

  constructor(
    private router: Router,
    private tableService: TableService,
    private customersService: CustomersService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  get page() {
    return getCurrentPage(this.customers)
  }

  ngOnInit(): void {
    this.loadCustomers()
  }

  loadCustomers(url?: string) {
    this.isLoading = true
    this.customersService.getAll({ url }).subscribe((data) => {
      this.isLoading = false
      this.customers = data
    }, () => this.handleError())
  }

  search() {
    const data = this.customers
    this.customers.results = this.tableService.search(this.searchInput, data.results)
  }

  create() {
    this.router.navigate(['/customers', 'customer-create'])
  }

  edit(customer: Customer) {
    this.router.navigate(['/customers', 'customer-edit', customer.id])
  }

  delete(customer: Customer) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.deleteCustomer(customer.id),
    })
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadCustomers(this.customers.previous)
    } else if (params.pageIndex > this.page) {
      this.loadCustomers(this.customers.next)
    }
  }

  private deleteCustomer(id: string) {
    this.customersService.delete(id).subscribe(() => {
      this.loadCustomers()
      this.message.success('Cliente excluído com sucesso')
    })
  }

  private handleError() {
    this.isLoading = false
    this.message.error('Erro ao carregar lista de clientes')
  }
}
