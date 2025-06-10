import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectableDdrService } from 'src/app/ddrs/selectable-ddr-service';

@Component({
  selector: 'app-ddr-filter',
  templateUrl: './base-ddr-filter.component.html',
  styleUrls: ['./base-ddr-filter.component.css'],
  providers: [SelectableDdrService]
})


export class BaseDdrFilterComponent {
  @Output() generateReport = new EventEmitter<any>();
  @Output() valueChanges = new EventEmitter<any>();
  validateForm: FormGroup;
  hideButtons = false;
  filterByAllDdrs = false;

  constructor(
    private fb: FormBuilder,
    public selectableDdrService: SelectableDdrService
  ) {
    this.validateForm = this.fb.group({
      ddr: [null],
    });
  }

  ngOnInit(): void {
    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });


    this.selectableDdrService.init();
  }

  generateExcel(): void {
    // lógica para gerar excel
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      this.generateReport.emit({
        ...this.validateForm.value,
      });
    }
  }
}
