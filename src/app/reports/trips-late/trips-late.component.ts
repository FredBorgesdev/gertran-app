import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-trips-late',
  templateUrl: './trips-late.component.html',
  styleUrls: ['./trips-late.component.css']
})
export class TripsLateComponent implements OnInit {
  isLoading = false;
  validateForm: FormGroup;
  customers = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
    });
  }

  emitGenerateReport(): void {
  }
}
