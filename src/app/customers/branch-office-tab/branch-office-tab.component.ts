import { Component, Input, OnInit } from '@angular/core';

export interface BranchOfficeDataItem {
  id: number
  companyName: string
  brandName: string
  cnpj: string
  contactName: string
  contactEmail: string
  blocked: boolean
}

@Component({
  selector: 'app-branch-office-tab',
  templateUrl: './branch-office-tab.component.html',
  styleUrls: ['./branch-office-tab.component.css']
})
export class BranchOfficeTabComponent implements OnInit {

  @Input() customerId: number

  branchOffices = [
    {
      id: 1475,
      companyName: 'Gertran Rio de Janeiro',
      brandName: 'Gertran',
      cnpj: '22.988.988/0001-00',
      contactName: 'João da Silva',
      contactEmail: 'joao.silva@gertran.com.br',
      blocked: false
    },
    {
      id: 1746,
      companyName: 'Gertran Espirito Santo',
      brandName: 'Gertran ES',
      cnpj: '14.988.988/0001-00',
      contactName: 'Carlos da Silva',
      contactEmail: 'carlos.silva@gertran.com.br',
      blocked: false
    }
  ]

  isCreatingBranchOffice = false

  constructor() { }

  ngOnInit(): void {
  }

  addBranchOffice(branchOffice: BranchOfficeDataItem) {
    const newContact = {
      id: this.branchOffices.length + 1,
      ...branchOffice,
    }
    console.log(newContact)
    this.branchOffices = [...this.branchOffices, newContact]
    this.isCreatingBranchOffice = false
  }
}
