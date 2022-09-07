import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message';

import { TableService } from '../../shared/services/table.service'
import { Customer, CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  isLoading = false
  customers = []
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
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.customersService.getAll().subscribe((data: Customer[]) => {
      this.isLoading = false
      this.customers = data
    }, () => this.handleError())
  }

  search() {
    const data = this.customers
    this.customers = this.tableService.search(this.searchInput, data)
  }

  create() {
    this.router.navigate(['/customers', 'customer-create'])
  }

  edit(item: Customer) {
    this.router.navigate(['/customers', 'customer-edit', item.id])
  }

  private handleError() {
    this.isLoading = false
    this.message.error('Erro ao carregar lista de clientes')
  }
}
