import { Component, OnInit } from '@angular/core';
import { InsuranceCompaniesService, InsuranceCompany } from '../insurance-companies.service';

@Component({
  selector: 'app-insurance-companies-list',
  templateUrl: './insurance-companies-list.component.html',
  styleUrls: ['./insurance-companies-list.component.css']
})
export class InsuranceCompaniesListComponent implements OnInit {

  isLoading = false
  insuranceCompanies: InsuranceCompany[] = []

  insuranceCompaniesColumns = [
    {
      title: 'Nome',
      compare: (
        a: InsuranceCompany,
        b: InsuranceCompany
      ) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      compare: (
        a: InsuranceCompany,
        b: InsuranceCompany
      ) => a.email.localeCompare(b.email),
    },
    { title: 'Telefone' },
    { title: 'Site' },
    { title: 'Ações' },
  ]

  constructor(
    private insuranceCompaniesService: InsuranceCompaniesService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.insuranceCompaniesService.getAll().subscribe((data) => {
      this.insuranceCompanies = data
      this.isLoading = false
    })
  }

  create() {}

}
