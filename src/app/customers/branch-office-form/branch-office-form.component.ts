import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchOffice } from '../branch-offices.service';

@Component({
  selector: 'app-branch-office-form',
  templateUrl: './branch-office-form.component.html',
  styleUrls: ['./branch-office-form.component.css']
})
export class BranchOfficeFormComponent implements OnInit {

  @Input() branchOffice: BranchOffice = null
  @Input() isVisible = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<BranchOffice>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      cnpj: [this.branchOffice?.cnpj, [Validators.pattern('[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}')]],
      tradingName: [this.branchOffice?.tradingName, [Validators.required]],
      corporateName: [this.branchOffice?.corporateName, [Validators.required]],
      domain: [this.branchOffice?.domain, []],
    })
  }

  handleOk() {
    if (this.validateForm.valid) {
      this.onSubmit.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      })
    }
  }

  handleCancel() {
    this.onClose.emit();
  }
}
