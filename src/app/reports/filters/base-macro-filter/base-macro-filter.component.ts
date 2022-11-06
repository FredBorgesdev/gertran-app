import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseVehicleFilter} from '../../reports.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {SelectableTruckService} from '../../../trucks/selectable-truck.service';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {format} from 'date-fns';

@Component({
  selector: 'app-base-macro-filter',
  templateUrl: './base-macro-filter.component.html',
  styleUrls: ['./base-macro-filter.component.css']
})
export class BaseMacroFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseVehicleFilter>();
  @Input() hideButtons = false;

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableTrucksService: SelectableTruckService,
    public selectableCustomerService: SelectableCustomerServiceService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      plate: ['GER1111', []],
      type: ['all', []]
    });

    this.i18n.setLocale(en_US);
    this.selectableCustomerService.init();
  }

  emitGenerateReport(): void {
    if (!this.validateForm.valid) {
      return;
    }

    this.generateReport.emit(this.buildFilters());
  }

  loadVehicles(customerId: string): void {
    this.selectableTrucksService.loadMoreTrucks({ customerId });
  }

  private buildFilters(): BaseVehicleFilter {
    const fromDate = format(this.validateForm.controls.startDate.value, 'yyyy-MM-dd');
    const toDate = format(this.validateForm.controls.endDate.value, 'yyyy-MM-dd');

    const filters = {
      ...this.validateForm.value,
      from: fromDate,
      to: toDate,
    };

    if (this.isFilterAll) {
      delete filters.type;
    }

    return filters;
  }

  private get isFilterAll(): boolean {
    return this.validateForm.value.type === 'all';
  }
}
