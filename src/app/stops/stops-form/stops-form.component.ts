import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { stopsListTypeCategories, stopsListTypes } from '../stops-list/mocked-data';
import { Stop } from '../stops-list/stops-list.component';

@Component({
  selector: 'app-stops-form',
  templateUrl: './stops-form.component.html',
  styleUrls: ['./stops-form.component.css']
})
export class StopsFormComponent implements OnInit {
  @Input() stop: Stop
  @Output() onSave: EventEmitter<Stop> = new EventEmitter<Stop>()

  validateForm: FormGroup
  stopTypes = stopsListTypes

  categoriesTransferItems: TransferItem[] = stopsListTypeCategories.map(category => ({
    key: category.id,
    title: category.name,
  }))

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [this.stop?.name],
      description: [this.stop?.description],
      address: [this.stop?.address],
      radius: [this.stop?.radius],
      typeId: [this.stop?.typeId],
      city: [this.stop?.city],
      state: [this.stop?.state],
      typeCategoryIds: [this.stop?.typeCategoryIds]
    })
  }

  save() {
    this.onSave.emit(this.validateForm.value)
  }

  listStops() {
    this.router.navigate(['/stops/stops-list'])
  }

}
