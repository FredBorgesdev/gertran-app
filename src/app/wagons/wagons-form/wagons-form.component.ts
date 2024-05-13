import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Wagon, WagonsService} from '../wagons.service';
import {VehicleModelsService} from '../../vehicle-manufacturers/vehicle-models.service';
import {VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import {VehicleManufacturersService} from '../../vehicle-manufacturers/vehicle-manufacturers.service';
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {VehiclesFormComponent} from '../../vehicles/vehicles-form/vehicles-form.component';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {
  SelectableVehicleManufacturersService
} from '../../vehicle-manufacturers/selectable-vehicle-manufacturers.service';
import {UtilsService} from '../../shared/services/utils.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {SelectableVehicleModelService} from "../../vehicles/selectable-vehicle-model.service";

@Component({
  selector: 'app-wagons-form',
  templateUrl: './wagons-form.component.html',
  styleUrls: ['./wagons-form.component.css']
})
export class WagonsFormComponent extends VehiclesFormComponent<Wagon> implements OnInit {
  @Input() wagon: Wagon = null;

  constructor(
    private router: Router,
    selectableVehicleManufacturersService: SelectableVehicleManufacturersService,
    selectableCustomerService: SelectableCustomerServiceService,
    selectableVehicleModelService: SelectableVehicleModelService,
    vehicleModelsService: VehicleModelsService,
    vehicleModelTypesService: VehicleModelTypesService,
    vehicleManufacturersService: VehicleManufacturersService,
    formBuilder: FormBuilder,
    service: WagonsService,
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
      selectableCustomerService,
      selectableVehicleManufacturersService,
      authService,
      selectableVehicleModelService,
    );
  }

  ngOnInit(): void {
    this.resource = this.wagon;

    super.ngOnInit();
  }

  backToCustomerList(): void {
    this.router.navigate(['customers', 'customers-edit', this.activatedRoute.snapshot.paramMap.get('customer_id')]);
  }

  protected handleSuccess(response?: any): void {
    this.message.success('Registro salvo com sucesso');
    this.router.navigate(['wagons', 'wagons-edit', response.id, this.activatedRoute.snapshot.paramMap.get('customer_id')]);
    this.isLoading = false;
  }
}
