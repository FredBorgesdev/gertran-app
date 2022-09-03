import { Component, Input, OnInit } from '@angular/core';
import { BranchOfficeDataItem } from '../branch-office-tab/branch-office-tab.component';

@Component({
  selector: 'app-branch-office-table',
  templateUrl: './branch-office-table.component.html',
  styleUrls: ['./branch-office-table.component.css']
})
export class BranchOfficeTableComponent implements OnInit {

  @Input() branchOffices: BranchOfficeDataItem[] = []

  branchOfficesOrderColumn = [
    {
      title: 'ID',
      compare: (a: BranchOfficeDataItem, b: BranchOfficeDataItem) => a.id - b.id,
    },
    {
      title: 'Razão social',
      compare: (a: BranchOfficeDataItem, b: BranchOfficeDataItem) => a.companyName.localeCompare(b.companyName)
    },
    {
      title: 'Nome fantasia',
      compare: (a: BranchOfficeDataItem, b: BranchOfficeDataItem) => a.brandName.localeCompare(b.brandName)
    },
    {
      title: 'CNJP',
      compare: (a: BranchOfficeDataItem, b: BranchOfficeDataItem) => a.cnpj.localeCompare(b.cnpj)
    },
    {
      title: 'Contato',
      compare: (a: BranchOfficeDataItem, b: BranchOfficeDataItem) => a.contactName.localeCompare(b.contactName)
    },
    {
      title: 'Email',
      compare: (a: BranchOfficeDataItem, b: BranchOfficeDataItem) => a.contactEmail.localeCompare(b.contactEmail)
    },
    {
      title: 'Bloqueado'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  branchOfficesEdit(item: BranchOfficeDataItem) {
    console.log('edit')
  }
}
