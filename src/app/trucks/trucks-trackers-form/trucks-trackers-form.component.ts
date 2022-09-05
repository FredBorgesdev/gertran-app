import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TruckTracker } from '../trucks-list/trucks-list.component';

@Component({
  selector: 'app-trucks-trackers-form',
  templateUrl: './trucks-trackers-form.component.html',
  styleUrls: ['./trucks-trackers-form.component.css']
})
export class TrucksTrackersFormComponent implements OnInit {

  @Input() tracker: TruckTracker = null
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
    console.log(this.tracker)
  }

  handleOk() {
    this.onAdd.emit(this.validateForm.value);
  }

  handleCancel() {
    this.onClose.emit(true);
  }
}
