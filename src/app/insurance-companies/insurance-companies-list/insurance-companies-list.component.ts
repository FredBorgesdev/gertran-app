import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ]

  constructor(
    private insuranceCompaniesService: InsuranceCompaniesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.insuranceCompaniesService.getAll().subscribe((data) => {
      this.insuranceCompanies = data
      this.isLoading = false
    })
  }

  create() {
    this.router.navigate(['insurance-companies/insurance-companies-create'])
  }

  edit(insuranceCompany: InsuranceCompany) {
    this.router.navigate([
      'insurance-companies',
      'insurance-companies-edit',
      insuranceCompany.id,
    ])
  }
}
