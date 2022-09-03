import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { TableService } from '../../shared/services/table.service'

interface DataItem {
  id: number
  brandName: string
  companyName: string
  cnpj: string
  contactName: string
  contactEmail: string
  blocked:  boolean
}

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  isLoading = false
  displayData = []
  searchInput: string

  customerColumn = [
    {
      title: 'ID',
      compare: (a: DataItem, b: DataItem) => a.id - b.id,
    },
    {
      title: 'Nome Fantasia',
      compare: (a: DataItem, b: DataItem) => a.brandName.localeCompare(b.brandName)
    },
    {
      title: 'Razão Social',
      compare: (a: DataItem, b: DataItem) => a.companyName.localeCompare(b.companyName)
    },
    {
      title: 'CNPJ'
    },
    {
      title: 'Contato',
      compare: (a: DataItem, b: DataItem) => a.contactName.localeCompare(b.contactName)
    },
    {
      title: 'Email'
    },
    {
      title: 'Status'
    },
    {
      title: 'Ações'
    }
  ]

  customersList = [
    {
      id: 1,
      brandName: 'Gertran',
      companyName: 'Gertran Transportes Ltda',
      cnpj: '99.999.999/9999-99',
      contactName: 'Sergio',
      contactEmail: 'gertran@gertran.com.br',
      blocked: false
    },
    {
      id: 999,
      brandName: 'Zayit Transportes',
      companyName: 'Zayit Soluções em Transportes Ltda',
      cnpj: '10.326.985/0001-01',
      contactName: 'Rodrigo Zayit',
      contactEmail: 'rodrigo@zayit.com.br',
      blocked: false
    },
    {
      id: 25,
      brandName: 'Empresa de Transporte',
      companyName: 'Empresa de Transportes Ltda',
      cnpj: '20.326.985/0001-01',
      contactName: 'John Doe',
      contactEmail: 'john@doe.com',
      blocked: true
    },
    {
      id: 325,
      brandName: '3M Transportadora',
      companyName: '3 Marias Transportadora de Cargas LTDA',
      cnpj: '30.085.036/0001-86',
      contactName: 'Maria',
      contactEmail: 'maria@3marias.com.br',
      blocked: false
    },
    {
      id: 187,
      brandName: '4 Irmãos Transportes',
      companyName: '4 Irmãos Transportes Ltda',
      cnpj: '38.471.340/0001-73',
      contactName: 'Ayslan Sergio',
      contactEmail: 'ayslansergio@icloud.com',
      blocked: true
    },
  ]

  constructor(
    private router: Router,
    private tableService: TableService
  ) {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.displayData = this.customersList
    }, 333)
  }

  ngOnInit(): void {
  }

  search() {
    const data = this.customersList
    this.displayData = this.tableService.search(this.searchInput, data)
  }

  create() {
    this.router.navigate(['/customers', 'customer-create'])
  }

  edit(item: DataItem) {
    this.router.navigate(['/customers', 'customer-edit', item.id])
  }
}
