import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Tracker {
  id: number;
  trackingSystem: string;
  trackingModel: string;
  trackingSerialNumber: string;
  main: boolean;
}

@Component({
  selector: 'app-trackers-form',
  templateUrl: './trackers-form.component.html',
  styleUrls: ['./trackers-form.component.css']
})
export class TrackersFormComponent implements OnInit {

  @Input() tracker: Tracker = null;
  @Input() isVisible = false;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAdd = new EventEmitter<any>();

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      trackingSystem: [this.tracker?.trackingSystem],
      trackingModel: [this.tracker?.trackingModel],
      trackingSerialNumber: [this.tracker?.trackingSerialNumber],
      main: [this.tracker?.main],
    });
    console.log(this.tracker);
  }

  handleOk() {
    this.onAdd.emit(this.validateForm.value);
  }

  handleCancel() {
    this.onClose.emit(true);
  }
}
