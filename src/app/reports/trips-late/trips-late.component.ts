import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseGenericFilter} from '../filters/base-generic-filters/base-generic-filters.component';
import {ReportsService} from '../reports.service';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';

@Component({
  selector: 'app-trips-late',
  templateUrl: './trips-late.component.html',
  styleUrls: ['./trips-late.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class TripsLateComponent implements OnInit {
  isLoading = false;
  validateForm: FormGroup;

  monitoringRequests: MonitoringRequests[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reportsService: ReportsService,
    public selectableCustomerService: SelectableCustomerServiceService,
  ) {}

  ngOnInit(): void {
    this.selectableCustomerService.init();

    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
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
