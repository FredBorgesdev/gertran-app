import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BaseWorkdayFilter } from '../../reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { SelectableCustomerServiceService } from '../../../customers/selectable-customer-service.service';
import { XlsxExporterService } from '../../../shared/services/xlsx-exporter.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { format, subMonths } from 'date-fns';
import { SelectableDriversService } from '../../../drivers/selectable-drivers.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { SelectableUsersService } from 'src/app/users/selectable-users.service';

@Component({
  selector: 'app-base-workday-employed-filter',
  templateUrl: './base-workday-employed-filter.component.html',
  styleUrls: ['./base-workday-employed-filter.component.css'],
  providers: [SelectableUsersService, SelectableCustomerServiceService],

})
export class BaseWorkdayEmployedFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseWorkdayFilter>();
  @Output() valueChanges = new EventEmitter<BaseWorkdayFilter>();
  @Output() generatePDF2 = new EventEmitter<any>();
  @Input() rows: any[];
  @Input() fileName = 'relatorio';

  validateForm: FormGroup;

  hoursMask = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
  selectedUserName: string;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public selectableUserService: SelectableUsersService,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.selectableUserService.init();
    this.selectableCustomerService.init();

    const today = new Date();
    const lastMonth = subMonths(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      from: [lastMonth, [Validators.required]],
      to: [today, [Validators.required]],
      user: [null, []],
      nightShiftStart: [null, []],
      nightShiftEnd: [null, []],
      reportFormat: ['analytic', [Validators.required]],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });


    this.validateForm.get('user')?.valueChanges.subscribe((userId) => {
      if (userId) {
        const selectedUser = this.selectableUserService.users.find(user => user.id === userId);
        // const ad = selectedUser ? selectedUser.name : 'null';

        this.selectedUserName = selectedUser.name
      } else {
        this.selectedUserName = null;
      }
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


  aaa(aa: string): void {
    console.log(aa)
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithCustomer = `${this.fileName} - ${this.customerName}`;

    this.xlsxExporterService.generate(fileNameWithCustomer, this.rows);
  }

  generatePdf(): void {
    const doc = new jsPDF();

    autoTable(doc, {
      html: 'table',
      didDrawPage: (data) => {
        doc.addImage('assets/images/logo/logogertran.png', 'PNG', 80, 10, 50, 50);
      },
      margin: { top: 70 },
      columnStyles: {
        0: {
          cellWidth: 30,
          fontSize: 8,
        }
      }
    });

    doc.save('table.pdf');
  }


  emitGeneratePDF2(): void {

    const fromDate = format(this.validateForm.controls.from.value, 'dd/MM/yyyy');
    const toDate = format(this.validateForm.controls.to.value, 'dd/MM/yyyy');



    this.generatePDF2.emit({
      name: this.selectedUserName, 
      from: fromDate,
      to: toDate
    });
  }

  get customerName(): string {
    return this.selectableCustomerService.customers.find((customer) => customer.id === this.validateForm.value.customer)?.tradingName;
  }
}
