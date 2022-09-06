import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
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
    private modal: NzModalService,
    private message: NzMessageService
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

  delete(insuranceCompany: InsuranceCompany) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.deleteInsuranceCompany(insuranceCompany.id),
    })
  }

  deleteInsuranceCompany(id: string) {
    this.isLoading = true
    this.insuranceCompaniesService.delete(id).subscribe(() => {
      this.insuranceCompanies = this.insuranceCompanies.filter(
        (insuranceCompany) => insuranceCompany.id !== id
      )
      this.message.success('Seguradora excluída com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir seguradora')
      this.isLoading = false
    })
  }
}
