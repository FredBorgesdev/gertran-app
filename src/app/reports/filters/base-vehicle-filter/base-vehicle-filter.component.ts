import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Truck, TrucksService} from '../../../trucks/trucks.service';

interface BaseVehicleFilter {
  customer: string;
  vehicle: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-base-vehicle-filter',
  templateUrl: './base-vehicle-filter.component.html',
  styleUrls: ['./base-vehicle-filter.component.css']
})
export class BaseVehicleFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseVehicleFilter>();
  @Input() hideButtons = false;

  validateForm: FormGroup;
  customers: Customer[] = [];
  vehicles: Truck[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private customerService: CustomersService,
    private trucksService: TrucksService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      vehicle: [null, [Validators.required]],
    });

    this.i18n.setLocale(en_US);

    this.customerService.getAll({ limit: 999 }).subscribe((response) => {
      this.customers = response.results;
    });
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      this.generateReport.emit(this.validateForm.value);
    }
  }

  loadVehicles(customerId: string): void {
    this.trucksService.getAll({ limit: 999 }, { customerId }).subscribe((response) => {
      this.vehicles = response.results;
    });
  }
}
