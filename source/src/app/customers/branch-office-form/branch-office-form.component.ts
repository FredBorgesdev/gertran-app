import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-branch-office-form',
  templateUrl: './branch-office-form.component.html',
  styleUrls: ['./branch-office-form.component.css']
})
export class BranchOfficeFormComponent implements OnInit {

  @Input() isVisible = false;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAdd = new EventEmitter<any>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      companyName: [null],
      brandName: [null],
      cnpj: [null],
      contactName: [null],
      contactEmail: [null],
      cep: [null],
      publicPlace: [null],
      number: [null],
      complement: [null],
      neighborhood: [null],
      city: [null],
      state: [null],
    })
  }

  handleOk() {
    this.onAdd.emit(this.validateForm.value);
  }

  handleCancel() {
    this.onClose.emit(true);
  }
}
