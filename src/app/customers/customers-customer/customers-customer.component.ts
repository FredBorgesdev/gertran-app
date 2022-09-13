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

  isLoading = false;

  customer = null;

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

  onSubmit() {
    this.isLoading = true
    if (this.customer.id) {
      this.customersService.update(this.customer.id, this.customer).subscribe(
        () => this.handleSuccess(),
        () => this.handleError()
      )
    } else {
      this.customersService.save(this.customer).subscribe(
        ({ id }) => this.handleSuccess(id),
        () => this.handleError()
      )
    }
  }

  onChangeCustomer(value: Customer) {
    this.customer = { ...this.customer, ...value }
  }

  private handleSuccess(id?: string) {
    this.isLoading = false
    this.message.success(
      'As informações foram salvas com sucesso!',
      { nzDuration: 3000 }
    )
    if (id) {
      this.router.navigate(['/customers', 'customers-edit', id])
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
