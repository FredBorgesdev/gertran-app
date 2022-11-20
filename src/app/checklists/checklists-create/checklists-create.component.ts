import { Component, OnInit } from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Checklist, ChecklistsService} from '../checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Truck, TrucksService} from '../../trucks/trucks.service';
import {SelectableTruckService} from '../../trucks/selectable-truck.service';

@Component({
  selector: 'app-checklists-create',
  templateUrl: './checklists-create.component.html',
  styleUrls: ['./checklists-create.component.css']
})
export class ChecklistsCreateComponent extends BaseCrudFormComponent<Checklist> implements OnInit {
  trucks: Truck[] = [];
  formVehiclesCount = [1, 2, 3, 4, 5]

  constructor(
    service: ChecklistsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private trucksService: TrucksService,
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
      plate1: [null],
      plate2: [null],
      plate3: [null],
      plate4: [null],
      plate5: [null],
    });
  }

  list(): void {
    this.router.navigate(['checklists', 'checklists-list']);
  }

  handleModelChange(): void {
    this.selectableTrucksService.resetFilters();
  }
}
