import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customers.service';

@Component({
  selector: 'app-addresses-form',
  templateUrl: './addresses-form.component.html',
  styleUrls: ['./addresses-form.component.css']
})
export class AddressesFormComponent implements OnInit {

  @Input() customer: Customer
  @Output() onSave: EventEmitter<Customer> = new EventEmitter<Customer>();

  validateForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      zipCode: [this.customer?.zipCode, [Validators.pattern('[0-9]{5}-[0-9]{3}')]],
      street: [this.customer?.street, []],
      complement: [this.customer?.complement, []],
      number: [this.customer?.number, []],
      neighborhood: [this.customer?.neighborhood, []],
      city: [this.customer?.city, []],
      state: [this.customer?.state, []],
    })
  }

  save() {
    if (this.validateForm.valid) {
      this.onSave.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      })
    }
  }
}
