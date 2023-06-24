import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseVehicleFilter} from '../../reports.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {SelectableTruckService} from '../../../trucks/selectable-truck.service';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {format, subWeeks} from 'date-fns';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from "@angular/router";
import {TrucksService} from "../../../trucks/trucks.service";
import {CustomersService} from "../../../customers/customers.service";

@Component({
  selector: 'app-base-macro-filter',
  templateUrl: './base-macro-filter.component.html',
  styleUrls: ['./base-macro-filter.component.css']
})
export class BaseMacroFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseVehicleFilter>();
  @Input() hideButtons = false;
  @Input() rows: any[];
  @Input() fileName = 'relatorio';

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableTrucksService: SelectableTruckService,
    public selectableCustomerService: SelectableCustomerServiceService,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private trucksService: TrucksService,
    private customersService: CustomersService,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      plate: [null, []],
      type: ['all', []]
    });

    this.i18n.setLocale(en_US);
    this.selectableCustomerService.init();
    this.selectableTrucksService.setupSearch();

    this.route.queryParams.subscribe(async params => {
      const {customerId, vehiclePlate} = params || {};

      if (!customerId || !vehiclePlate) {
        return;
      }

      const customer = await this.customersService.get(customerId).toPromise();
      const {results} = await this.trucksService.getAll({}, {
        plate: vehiclePlate,
      }).toPromise();

      this.selectableCustomerService.appendCustomer(customer);
      this.selectableTrucksService.appendTrucks(results);

      const oneWeekAgo = subWeeks(new Date(), 1);
      this.validateForm.patchValue({
        customer: customerId,
        plate: vehiclePlate,
        startDate: oneWeekAgo,
        endDate: new Date(),
      });
    });
  }

  emitGenerateReport(): void {
    if (!this.validateForm.valid) {
      return;
    }

    this.generateReport.emit(this.buildFilters());
  }

  loadVehicles(customerId: string): void {
    this.selectableTrucksService.loadMoreTrucks({customerId});
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

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithPlate = `${this.fileName} - ${this.validateForm.value.plate}`;

    this.xlsxExporterService.generate(fileNameWithPlate, this.rows);
  }

  private get isFilterAll(): boolean {
    return this.validateForm.value.type === 'all';
  }
}
