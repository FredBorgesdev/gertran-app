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
import {VehicleModelsService} from '../../vehicle-manufacturers/vehicle-models.service';
import {VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import {VehicleManufacturersService} from '../../vehicle-manufacturers/vehicle-manufacturers.service';
import {Truck, TrucksService} from '../trucks.service';
import {FormBuilder} from '@angular/forms';
import {VehiclesFormComponent} from '../../vehicles/vehicles-form/vehicles-form.component';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {SelectableVehicleManufacturersService} from '../../vehicle-manufacturers/selectable-vehicle-manufacturers.service';
import {UtilsService} from '../../shared/services/utils.service';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-trucks-form',
  templateUrl: './trucks-form.component.html',
  styleUrls: ['./trucks-form.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class TrucksFormComponent extends VehiclesFormComponent<Truck> implements OnInit {
  @Input() truck: Truck;

  constructor(
    private router: Router,
    selectableVehicleManufacturersService: SelectableVehicleManufacturersService,
    selectableCustomersService: SelectableCustomerServiceService,
    vehicleModelsService: VehicleModelsService,
    vehicleModelTypesService: VehicleModelTypesService,
    vehicleManufacturersService: VehicleManufacturersService,
    formBuilder: FormBuilder,
    service: TrucksService,
    activatedRoute: ActivatedRoute,
    message: NzMessageService,
    utilsService: UtilsService,
    authService: AuthenticationService,
  ) {
    super(
      service,
      message,
      activatedRoute,
      formBuilder,
      vehicleModelsService,
      vehicleModelTypesService,
      vehicleManufacturersService,
      utilsService,
      selectableCustomersService,
      selectableVehicleManufacturersService,
      authService,
    );
  }

  loadFormBuilder(): void {
    super.loadFormBuilder([
      'numberOfAxles',
      'cubage',
    ]);
  }

  loadResource(): void {
    super.loadResource([
      'numberOfAxles',
      'cubage',
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
