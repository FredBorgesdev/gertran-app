import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import {NzMessageService} from 'ng-zorro-antd/message';

export interface BaseGenericFilter {
  plate: string;
  point?: string;
  internalCode?: string;
  invoice?: string;
}

@Component({
  selector: 'app-base-generic-filters',
  templateUrl: './base-generic-filters.component.html',
  styleUrls: ['./base-generic-filters.component.css']
})
export class BaseGenericFiltersComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseGenericFilter>();
  @Input() hideButtons = false;
  @Input() rows: any[];
  @Input() fileName = 'relatorio';

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      plate: [null, []],
      point: [null, []],
      internalCode: [null, []],
      invoice: [null, []],
    });
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      this.generateReport.emit(this.validateForm.value);
    }
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithPlate = `${this.fileName} - ${this.validateForm.value.plate}`;

    this.xlsxExporterService.generate(fileNameWithPlate, this.rows);
  }
}
