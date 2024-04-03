import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailDataItem } from '../emails.service';

@Component({
  selector: 'app-emails-form',
  templateUrl: './emails-form.component.html',
  styleUrls: ['./emails-form.component.css']
})
export class EmailsFormComponent implements OnInit {

  @Input() email: EmailDataItem = null;
  @Input() isVisible = false;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<any>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [this.email?.name, [Validators.required]],
      email: [this.email?.email, [Validators.required]],
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
