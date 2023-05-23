import {Component, OnInit} from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Checklist, ChecklistsService} from '../checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder} from '@angular/forms';
import {Truck, TrucksService} from '../../trucks/trucks.service';
import {SelectableTruckService} from '../../trucks/selectable-truck.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SelectableDriversService} from "../../drivers/selectable-drivers.service";

@Component({
  selector: 'app-checklists-create',
  templateUrl: './checklists-create.component.html',
  styleUrls: ['./checklists-create.component.css']
})
export class ChecklistsCreateComponent extends BaseCrudFormComponent<Checklist> implements OnInit {
  trucks: Truck[] = [];
  vehicleMessages = {};

  constructor(
    service: ChecklistsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public selectableTrucksService: SelectableTruckService,
    public selectableDriverService: SelectableDriversService,
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
    this.selectableDriverService.init();
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      checklistRequests: this.formBuilder.array([
        this.generateChecklistRequest(),
        this.generateChecklistRequest(),
        this.generateChecklistRequest(),
        this.generateChecklistRequest(),
        this.generateChecklistRequest(),
      ]),
    });
  }

  generateChecklistRequest(): AbstractControl {
    return this.formBuilder.group({
      vehicle: [null, []],
      driver: [null, []],
      driverPhone: [{value: null, disabled: true}, []],
      origin: [null, []],
      destiny: [null, []],
    });
  }

  get checklists(): FormArray {
    return this.validateForm.get('checklistRequests') as FormArray;
  }

  getValues(): any {
    return {
      checklistRequests: this.validateForm.get('checklistRequests')
        .value
        .filter(checklist => Boolean(checklist.vehicle))
        .map(checklist => ({
          vehicle: checklist.vehicle,
          origin: checklist.origin,
          destiny: checklist.destiny,
          driver: checklist.driver,
        }))
    };
  }

  protected handleSuccess(response: {
    message: string;
    vehicleId: string;
  }[]): void {
    response.forEach(({message, vehicleId}) => {
      this.vehicleMessages[vehicleId] = message;
    });

    this.isLoading = false;
  }

  list(): void {
    this.router.navigate(['checklists', 'checklists-list']);
  }

  handleModelChange(): void {
    this.selectableTrucksService.resetFilters();
  }

  loadDriverPhone(driverId: string, index: number): void {
    const driver = this.selectableDriverService.drivers.find(({id}) => id === driverId);

    if (driver) {
      this.checklists.controls[index].get('driverPhone').setValue(driver.phoneNumber);
    }
  }
}
