import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CustomersService} from '../../customers/customers.service';
import {VehicleModelsService} from '../../vehicle-manufacturers/vehicle-models.service';
import {VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import {VehicleManufacturersService} from '../../vehicle-manufacturers/vehicle-manufacturers.service';
import {Truck, TrucksService} from '../trucks.service';
import {FormBuilder} from '@angular/forms';
import {VehiclePeripheralsService} from '../../vehicle-peripherals/vehicle-peripherals.service';
import {VehiclesFormComponent} from '../../vehicles/vehicles-form/vehicles-form.component';

@Component({
  selector: 'app-trucks-form',
  templateUrl: './trucks-form.component.html',
  styleUrls: [ './trucks-form.component.css' ]
})
export class TrucksFormComponent extends VehiclesFormComponent<Truck> implements OnInit {
  @Input() truck: Truck;

  constructor(
    private router: Router,
    customersService: CustomersService,
    vehicleModelsService: VehicleModelsService,
    vehicleModelTypesService: VehicleModelTypesService,
    vehicleManufacturersService: VehicleManufacturersService,
    formBuilder: FormBuilder,
    vehiclePeripheralsService: VehiclePeripheralsService,
    service: TrucksService,
    activatedRoute: ActivatedRoute,
    message: NzMessageService
  ) {
    super(
      service,
      message,
      activatedRoute,
      formBuilder,
      vehiclePeripheralsService,
      vehicleModelsService,
      vehicleModelTypesService,
      vehicleManufacturersService,
      customersService,
    );
  }

  loadFormBuilder(): void {
    super.loadFormBuilder([
      'numberOfAxles',
      'cubage',
      'chargingMethod',
    ]);
  }

  loadResource(): void {
    super.loadResource([
      'numberOfAxles',
      'cubage',
      'chargingMethod',
    ]);
  }

  ngOnInit(): void {
    this.resource = this.truck;

    super.ngOnInit();
  }

  list(): void {
    this.router.navigate([ '/trucks/trucks-list' ]);
  }
}
