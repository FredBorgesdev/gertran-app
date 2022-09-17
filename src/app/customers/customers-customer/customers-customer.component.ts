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
    this.isLoading = true;
    await this.loadCustomer();
    this.isLoading = false;
  }

  async loadCustomer(): Promise<any> {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      return this.customersService.get(id).subscribe((customer: Customer) => {
        this.customer = customer;
      });
    }

    this.createNewCustomer();
  }

  createNewCustomer(): void {
    this.customer = {
      id: null,
      brandName: '',
      companyName: '',
      cnpj: '',
      contactName: '',
      contactEmail: '',
      blocked: false
    };
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.customer.id) {
      this.customersService.update(this.customer.id, this.customer).subscribe(
        () => this.handleSuccess(),
        () => this.handleError()
      );
    } else {
      this.customersService.save(this.customer).subscribe(
        ({ id }) => this.handleSuccess(id),
        () => this.handleError()
      );
    }
  }

  onChangeCustomer(value: Customer): void {
    this.customer = { ...this.customer, ...value };
  }

  savePermission(permissions: number[]): void {
    this.customer.permissions = permissions;
    this.onSubmit();
  }

  numbersToStrings(numbers?: number[]): string[] {
    return numbers?.map(String) ?? [];
  }

  private handleSuccess(id?: string): void {
    this.isLoading = false;
    this.message.success(
      'As informações foram salvas com sucesso!',
      { nzDuration: 3000 }
    );
    if (id) {
      this.router.navigate(['/customers', 'customers-edit', id]);
    } else {
      this.router.navigate(['/customers', 'customers-list']);
    }
  }

  private handleError(): void {
    this.isLoading = false;
    this.message.error(
      'Ocorreu um erro ao salvar as informações.',
      { nzDuration: 3000 }
    );
  }
}
