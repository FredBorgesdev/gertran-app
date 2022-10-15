import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
}
