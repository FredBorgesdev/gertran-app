import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactDataItem } from '../contacts.service';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {

  @Input() contact: ContactDataItem = null;
  @Input() isVisible = false;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<any>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.contact);
    this.validateForm = this.formBuilder.group({
      name: [this.contact?.name, [Validators.required]],
      email: [this.contact?.email, [Validators.required]],
      phone: [this.contact?.phone, [Validators.required]],
      cellPhone: [this.contact?.cellPhone, [Validators.required]],
    });
  }

  handleOk() {
    if (this.validateForm.valid) {
      this.onSubmit.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  handleCancel() {
    this.onClose.emit(true);
  }
}
