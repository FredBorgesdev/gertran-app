import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VehiclePeripheralsService, VehiclePeripherals } from '../vehicle-peripherals.service';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Choice} from '../../shared/services/api.service';

@Component({
  selector: 'app-vehicle-peripherals-form',
  templateUrl: './vehicle-peripherals-form.component.html',
  styleUrls: ['./vehicle-peripherals-form.component.css'],
})
export class VehiclePeripheralsFormComponent extends BaseCrudFormComponent<VehiclePeripherals> implements OnInit {
  peripheralTypes: Choice[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    service: VehiclePeripheralsService,
    message: NzMessageService,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    (this.service as VehiclePeripheralsService).getPeripheralTypes().subscribe((peripheralTypes) => {
      this.peripheralTypes = peripheralTypes;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      peripheralType: [null, [Validators.required]],
    });
  }

  list(): void {
    this.router.navigate(['/vehicle-peripherals/vehicle-peripherals-list']);
  }
}
