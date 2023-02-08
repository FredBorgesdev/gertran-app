import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {BaseWorkdayFilter} from '../../reports.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {format, subMonths} from 'date-fns';
import {SelectableDriversService} from '../../../drivers/selectable-drivers.service';

@Component({
  selector: 'app-base-workday-filter',
  templateUrl: './base-workday-filter.component.html',
  styleUrls: ['./base-workday-filter.component.css'],
  providers: [SelectableDriversService, SelectableCustomerServiceService],
})
export class BaseWorkdayFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseWorkdayFilter>();
  @Output() valueChanges = new EventEmitter<BaseWorkdayFilter>();
  @Input() hideButtons = false;
  @Input() showCustomer = true;
  @Input() rows: any[];
  @Input() fileName = 'relatorio';

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public selectableDriverService: SelectableDriversService,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.selectableDriverService.init();
    this.selectableCustomerService.init();

    const today = new Date();
    const lastMonth = subMonths(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      from: [lastMonth, [Validators.required]],
      to: [today, [Validators.required]],
      driver: [null, []],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });

    this.i18n.setLocale(en_US);
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      const fromDate = format(this.validateForm.controls.from.value, 'yyyy-MM-dd');
      const toDate = format(this.validateForm.controls.to.value, 'yyyy-MM-dd');
      this.generateReport.emit({
        ...this.validateForm.value,
        from: fromDate,
        to: toDate
      });
    }
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithCustomer = `${this.fileName} - ${this.customerName}`;

    this.xlsxExporterService.generate(fileNameWithCustomer, this.rows);
  }

  get columnWidth(): string {
    return this.showCustomer ? '6' : '8';
  }

  get customerName(): string {
    return this.selectableCustomerService.customers.find((customer) => customer.id === this.validateForm.value.customer)?.tradingName;
  }
}
