import { Component, OnInit } from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Checklist, ChecklistsService} from '../checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder} from '@angular/forms';
import {Truck, TrucksService} from '../../trucks/trucks.service';
import {SelectableTruckService} from '../../trucks/selectable-truck.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-checklists-create',
  templateUrl: './checklists-create.component.html',
  styleUrls: ['./checklists-create.component.css']
})
export class ChecklistsCreateComponent extends BaseCrudFormComponent<Checklist> implements OnInit {
  trucks: Truck[] = [];
  formVehiclesCount = [1, 2, 3, 4, 5];

  constructor(
    service: ChecklistsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public selectableTrucksService: SelectableTruckService,
  ) {
    super(
      service,
      message,
      activatedRoute
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.selectableTrucksService.init();
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      vehicles: this.formBuilder.array([
        this.formBuilder.control(null),
        this.formBuilder.control(null),
        this.formBuilder.control(null),
        this.formBuilder.control(null),
        this.formBuilder.control(null),
      ]),
    });
  }

  get vehicles(): FormArray {
    return this.validateForm.get('vehicles') as FormArray;
  }

  getValues(): any {
    return {
      vehicles: this.validateForm.get('vehicles').value.filter(Boolean)
    };
  }

  list(): void {
    this.router.navigate(['checklists', 'checklists-list']);
  }

  handleModelChange(): void {
    this.selectableTrucksService.resetFilters();
  }
}
