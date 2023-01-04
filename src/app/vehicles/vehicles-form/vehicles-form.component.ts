import {Component, Inject, OnInit} from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, Validators} from '@angular/forms';
import {VehicleModels, VehicleModelsService} from '../../vehicle-manufacturers/vehicle-models.service';
import {VehicleModelTypes, VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import { VehicleManufacturersService } from '../../vehicle-manufacturers/vehicle-manufacturers.service';
import {Customer} from '../../customers/customers.service';
import {HttpErrorResponse} from '@angular/common/http';
import {VehiclesService} from '../vehicles.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {Tracker} from '../../trackers/trackers.service';
import {SelectableVehicleManufacturersService} from '../../vehicle-manufacturers/selectable-vehicle-manufacturers.service';
import {UtilsService} from '../../shared/services/utils.service';
import {AuthenticationService} from '../../authentication/authentication.service';

export interface Vehicle {
  id: string;
  customers: Customer[];
  manufacturer: string;
  vehicleModel: string;
  vehicleModelType: string;
  peripherals: string[];
  workingSituation: string;
  plate: string;
  state: string;
  city: string;
  color: string;
  modelYear: number;
  chassis: string;
  renavam: string;
  description: string;
  trackers: Tracker[];
}

interface VehicleChild {
  id: string;
  vehicle: Vehicle;
}

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class VehiclesFormComponent<T extends VehicleChild> extends BaseCrudFormComponent<T> implements OnInit {
  customers: Customer[] = [];
  vehicleModels: VehicleModels[] = [];
  vehicleModelTypes: VehicleModelTypes[] = [];
  isLoadingMoreData = false;

  constructor(
    @Inject('service') protected service: VehiclesService<T>,
    message: NzMessageService,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vehicleModelsService: VehicleModelsService,
    private vehicleModelTypesService: VehicleModelTypesService,
    private vehicleManufacturersService: VehicleManufacturersService,
    private utilsService: UtilsService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public selectableVehicleManufacturersService: SelectableVehicleManufacturersService,
    public authService: AuthenticationService,
  ) {
    super(service, message, activatedRoute);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.selectableVehicleManufacturersService.init();

    if (!this.authService.customerId) {
      this.selectableCustomerService.init();
    }
    if (this.resource?.vehicle.manufacturer) {
      this.loadModels();
    }
    if (this.resource?.vehicle.vehicleModel) {
      this.selectType();
    }
  }

  async filterVehicleByPlate(): Promise<void> {
    const plate = this.validateForm.controls.plate.value;
    if (!plate) {
      return;
    }

    this.isLoading = true;
    const vehicle = await this.getByPlate(plate);
    if (!vehicle) {
      return;
    }

    this.resource = vehicle;
    this.loadResource();
    this.validateForm.patchValue({
      customers: this.validateForm.controls.customers.value.concat(this.authService.customerId),
    });
    this.isLoading = false;
  }

  async getByPlate(plate: string): Promise<T | null> {
    return this.service.getByPlate(plate).toPromise().catch(() => null);
  }

  loadFormBuilder(customProperties?: string[]): void {
    this.validateForm = this.formBuilder.group({
      customers: [[this.authService.customerId], [Validators.required]],
      manufacturer: [null, [Validators.required]],
      vehicleModel: [null, [Validators.required]],
      vehicleModelType: [null, [Validators.required]],
      plate: [null, [Validators.required, Validators.maxLength(7)]],
      state: [null, [Validators.required, Validators.maxLength(2)]],
      city: [null, [Validators.required]],
      color: [null, [Validators.required]],
      modelYear: [null, [Validators.required]],
      chassis: [null, [Validators.required]],
      renavam: [null, [Validators.required]],
      description: [null, []],
    });

    customProperties?.forEach(property => {
      this.validateForm.addControl(
        property,
        this.formBuilder.control(null, [Validators.required])
      );
    });
  }

  loadResource(customProperties?: string[]): void {
    if (!this.resource) {
      return;
    }

    this.validateForm.patchValue({
      customers: this.resource.vehicle.customers.map(customer => customer.id),
      manufacturer: this.resource.vehicle.manufacturer,
      vehicleModel: this.resource.vehicle.vehicleModel,
      vehicleModelType: this.resource.vehicle.vehicleModelType,
      peripherals: this.resource.vehicle.peripherals,
      workingSituation: this.resource.vehicle.workingSituation,
      plate: this.resource.vehicle.plate,
      state: this.resource.vehicle.state,
      city: this.resource.vehicle.city,
      color: this.resource.vehicle.color,
      modelYear: this.resource.vehicle.modelYear,
      chassis: this.resource.vehicle.chassis,
      renavam: this.resource.vehicle.renavam,
      description: this.resource.vehicle.description,
    });

    if (this.resource.vehicle?.customers) {
      if (!this.authService.customerId) {
        this.selectableCustomerService.concatCustomers(this.resource.vehicle.customers);
      }

      this.validateForm.patchValue({
        customers: this.resource.vehicle.customers.map((customer) => customer.id)
      });
    }

    if (this.resource.vehicle?.manufacturer) {
      this.vehicleManufacturersService.get(this.resource.vehicle.manufacturer).subscribe((manufacturer) => {
        this.selectableVehicleManufacturersService.concatManufacturers([manufacturer]);
      });
    }

    if (this.resource.vehicle?.vehicleModel) {
      this.vehicleModelsService.get(
        this.resource.vehicle.vehicleModel,
        this.resource.vehicle.manufacturer
      ).subscribe((model) => {
        this.vehicleModels = [model].concat(this.vehicleModels);
      });
    }

    customProperties?.forEach(property => {
      this.validateForm.patchValue({
        [property]: this.resource[property]
      });
    });
  }

  loadModels(): void {
    this.vehicleModelsService
      .getAll({ limit: 50 }, this.validateForm.controls.manufacturer.value)
      .subscribe((vehicleModels) => {
        this.vehicleModels = vehicleModels.results;
      });
  }

  selectType(): void {
    const vehicleModelId = this.validateForm.controls.vehicleModel.value;
    const selectedModel = this.vehicleModels.find(model => model.id === vehicleModelId);
    const vehicleModelTypeId = selectedModel?.vehicleModelType ?? this.validateForm.controls.vehicleModelType.value;

    this.vehicleModelTypesService.get(vehicleModelTypeId).subscribe((vehicleModelType) => {
      this.vehicleModelTypes = [vehicleModelType];
      this.validateForm.patchValue({ vehicleModelType: vehicleModelType.id });
    });
  }

  saveWithErrorHandling(): void {
    super.save({
      error: this.handleSaveError.bind(this),
    });
  }

  getValues(): T {
    return {
      ...this.utilsService.removeNullValues(super.getValues()),
      customers: this.validateForm.controls.customers.value.filter(Boolean),
    };
  }

  private handleSaveError(error: HttpErrorResponse): void {
    if (error.error.extra.fields === 'No fields were updated.') {
      return super.handleSuccess();
    }

    super.handleError();
  }
}
