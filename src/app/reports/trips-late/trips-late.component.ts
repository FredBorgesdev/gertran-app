import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomersService} from '../../customers/customers.service';
import {BaseGenericFilter} from '../filters/base-generic-filters/base-generic-filters.component';
import {ReportsService} from '../reports.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';

@Component({
  selector: 'app-trips-late',
  templateUrl: './trips-late.component.html',
  styleUrls: ['./trips-late.component.css']
})
export class TripsLateComponent implements OnInit {
  isLoading = false;
  validateForm: FormGroup;
  customers = [];

  monitoringRequests: MonitoringRequests[] = [];

  private isLoadingMoreData: boolean;
  private customersNextUrl: string;
  private searchCustomerSubject = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private reportsService: ReportsService,
  ) {
  }

  ngOnInit(): void {
    this.loadMoreCustomers();

    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
    });

    this.searchCustomerSubject.pipe(
      debounceTime(500)
    ).subscribe((name) => {
      this.customersService.getAll({ limit: 999 }, { name }).subscribe((customers) => {
        this.customers = customers.results;
      });
    });
  }

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customersService.getAll({
      limit: 999,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
    });
  }

  generateReport(form: BaseGenericFilter): void {
    const filter = {
      customer: this.validateForm.get('customer').value,
      ...form
    };
    this.isLoading = true;

    this.reportsService.getDelayedTripes(filter).subscribe((response) => {
      this.isLoading = false;
      this.monitoringRequests = response;
    });
  }

  searchCustomer(name: string): void {
    if (!name) {
      return;
    }

    this.searchCustomerSubject.next(name);
  }

  getWagons(data: MonitoringRequests): string {
    return data.wagons.map((wagon) => wagon.vehicle.plate).join(', ');
  }

  getInitialTravelStep(data: MonitoringRequests): string {
    return data.travelSteps[0].address;
  }

  getFinalTravelStep(data: MonitoringRequests): string {
    return data.travelSteps[data.travelSteps.length - 1].address;
  }

  getInvoices(data: MonitoringRequests): string {
    return data.invoices.map((invoice) => invoice.invoiceNumber).join(', ');
  }
}
