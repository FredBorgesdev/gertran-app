import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Customer, CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-customer',
  templateUrl: './customers-customer.component.html',
  styleUrls: ['./customers-customer.component.css']
})
export class CustomersCustomerComponent implements OnInit {

  isLoading = false

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

  customer = null

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService,
    private customersService: CustomersService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true
    await this.loadCustomer()
    this.isLoading = false
  }

  async loadCustomer() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id')
      return this.customersService.get(id).subscribe((customer: Customer) => {
        this.customer = customer
      })
    }

    this.createNewCustomer()
  }

  createNewCustomer() {
    this.customer = {
      id: null,
      brandName: '',
      companyName: '',
      cnpj: '',
      contactName: '',
      contactEmail: '',
      blocked: false
    }
  }

  onSubmit(value: Customer) {
    this.isLoading = true
    if (this.customer.id) {
      this.customersService.update(this.customer.id, value).subscribe(
        () => this.handleSuccess(),
        () => this.handleError()
      )
    } else {
      this.customersService.save(value).subscribe(
        ({ id }) => this.handleSuccess(id),
        () => this.handleError()
      )
    }
  }

  private handleSuccess(id?: string) {
    this.isLoading = false
    this.message.success(
      'As informações foram salvas com sucesso!',
      { nzDuration: 3000 }
    )
    if (id) {
      this.router.navigate(['/customers', 'customer-edit', id])
    } else {
      this.router.navigate(['/customers', 'customers-list'])
    }
  }

  private handleError() {
    this.isLoading = false
    this.message.error(
      'Ocorreu um erro ao salvar as informações.',
      { nzDuration: 3000 }
    )
  }
}
