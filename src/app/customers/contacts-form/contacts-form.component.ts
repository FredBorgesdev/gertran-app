import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {

  @Input() isVisible = false;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAdd = new EventEmitter<any>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null],
      email: [null],
      phone: [null],
      cellPhone: [null],
    })
  }

  handleOk() {
    this.onAdd.emit(this.validateForm.value);
  }

  handleCancel() {
    this.onClose.emit(true);
  }
}
