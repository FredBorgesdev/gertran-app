import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedOperationsItem} from "../shared-operations.service";

@Component({
  selector: 'app-shared-operations-form',
  templateUrl: './shared-operations-form.component.html',
  styleUrls: ['./shared-operations-form.component.css']
})
export class SharedOperationsFormComponent implements OnInit {

  @Input() sharedOperation: SharedOperationsItem = null;
  @Input() isVisible = false;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<any>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [this.sharedOperation?.name, [Validators.required]],
      email: [this.sharedOperation?.email, [Validators.required]],
    });
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.onSubmit.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  handleCancel(): void {
    this.onClose.emit(true);
  }
}
