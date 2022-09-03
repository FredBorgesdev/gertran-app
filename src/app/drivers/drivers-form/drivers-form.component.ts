import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-drivers-form',
  templateUrl: './drivers-form.component.html',
  styleUrls: ['./drivers-form.component.css']
})
export class DriversFormComponent implements OnInit {

  @Input() driver: any
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  validateForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [this.driver.name],
      cpf: [this.driver.cpf],
      cnh: [this.driver.cnh],
      cnhCategory: [this.driver.cnhCategory],
      cnhExpiration: [this.driver.cnhExpiration],
      cellphone: [this.driver.cellphone],
      profilePhoto: [this.driver.profilePhoto]
    })
  }

  save() {
    this.onSubmit.emit(this.validateForm.value)
  }

  listDrivers() {
    this.router.navigate(['/drivers/drivers-list'])
  }
}
