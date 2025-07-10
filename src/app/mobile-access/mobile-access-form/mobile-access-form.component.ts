import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MobileAccessService, MobileAccess } from '../mobile-access.service';
import { InsuranceCompaniesService } from 'src/app/insurance-companies/insurance-companies.service';
import { SelectableUsersService } from 'src/app/users/selectable-users.service';
import { CustomersService } from 'src/app/customers/customers.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-mobile-access-form',
  templateUrl: './mobile-access-form.component.html',
  styleUrls: ['./mobile-access-form.component.css']
})
export class MobileAccessFormComponent implements OnInit {

  isLoading = false;
  item: MobileAccess = null;
  validateForm: FormGroup;
  insuranceCompanies: any;
  customers: any[] = [];
  users: any[] = [];
  groupAccessList = [
    { id: 7, name: 'MOTORISTA' },
    { id: 8, name: 'CLIENTE' }
  ];

  private searchCustomerSubject = new Subject<string>();
  private customersNextUrl: string;
  private isLoadingMoreData: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: MobileAccessService,
    private message: NzMessageService,
    public selectableUsersService: SelectableUsersService,
    private customerService: CustomersService,
  ) {}

  ngOnInit(): void {

    // this.insuranceCompaniesService.getAll({ limit: 999 }).subscribe(response => {
    //   this.insuranceCompanies = response.results;
    // });



    this.validateForm = this.formBuilder.group({
      user: [null, Validators.required],
      customer: [null, Validators.required],
      group_mobile_access: [7, null],
      choise_charge_type: ['period', Validators.required],
      startAt: [null, Validators.required],
      endAt: [null, Validators.required]
    });



    this.searchCustomerSubject.pipe(debounceTime(500)).subscribe((search) => {
      this.isLoadingMoreData = true;
      this.customerService.getAll({ limit: 50 }, { search }).subscribe((customers) => {
        this.customers = customers.results;
        this.isLoadingMoreData = false;
      });
    });


    this.selectableUsersService.init();


    this.loadMoreCustomers()

    
    this.loadItem();
  }


  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customerService.getAll({
      limit: 50,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
    });
  }


  searchCustomer(name: string): void {
    if (!name) {
      return;
    }

    this.searchCustomerSubject.next(name);
  }

  loadItem() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.get(id).subscribe(data => {
        this.item = data;
        this.validateForm.patchValue({
          user: data.user?.id,
          customer: data.customer?.id,
          group_mobile_access: data.groupMobileAccess?.id,
          choise_charge_type: data.choiseChargeType,
          startAt: data.startAt,
          endAt: data.endAt,
        });
        this.isLoading = false;
      });
    }
  }
  
  
  navigateToList() {
    this.router.navigate(['/mobile-access/mobile-access-list']);
  }


  private formatDate(date: any): string {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Retorna no formato 'YYYY-MM-DD'
}

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (!control.invalid) return;
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    this.isLoading = true;

    // const payload = {
    //   ...this.validateForm.value,
    //   user: this.validateForm.value.user ,
    //   customer: this.validateForm.value.customer ,
    //   group_mobile_access: this.validateForm.value.group_mobile_access ,
    // };

    const formValue = { ...this.validateForm.value };

    // Formate as datas como string no formato ISO ou outro esperado pelo back-end
    formValue.startAt = this.formatDate(formValue.startAt);
    formValue.endAt = this.formatDate(formValue.endAt);

    if (this.item?.id) {
      this.service.update(this.item.id, formValue)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    } else {
      this.service.save(formValue)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    }
  }

  private handleSuccess() {
    this.message.success('MobileAccess salvo com sucesso');
    this.navigateToList();
    this.isLoading = false;
  }

  private handleError() {
    this.message.error('Erro ao salvar MobileAccess');
    this.isLoading = false;
  }
}
