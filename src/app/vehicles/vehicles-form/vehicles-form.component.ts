import {Component, Inject, OnInit} from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Choice} from '../../shared/services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import {VehiclePeripherals, VehiclePeripheralsService} from '../../vehicle-peripherals/vehicle-peripherals.service';
import {VehicleModels, VehicleModelsService} from '../../vehicle-manufacturers/vehicle-models.service';
import {VehicleModelTypes, VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import {VehicleManufacturers, VehicleManufacturersService} from '../../vehicle-manufacturers/vehicle-manufacturers.service';
import {Customer, CustomersService} from '../../customers/customers.service';
import {HttpErrorResponse} from '@angular/common/http';
import {VehiclesService} from '../vehicles.service';

export interface Vehicle {
  id: string;
  customer: string;
  manufacturer: string;
  vehicleModel: string;
  vehicleModelType: string;
  peripherals: string[];
  workingSituation: string;
  plate: string;
  state: string;
  city: string;
  color: string;
  year: number;
  chassis: string;
  renavam: string;
  description: string;
}

interface VehicleChild {
  id: string;
  vehicle: Vehicle;
}

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css']
})
export class VehiclesFormComponent<T extends VehicleChild> extends BaseCrudFormComponent<T> implements OnInit {
  customers: Customer[] = [];
  vehicleModels: VehicleModels[] = [];
  vehicleModelTypes: VehicleModelTypes[] = [];
  manufacturers: VehicleManufacturers[] = [];
  peripherals: VehiclePeripherals[] = [];
  workingSituations: Choice[] = [];

  constructor(
    @Inject('service') protected service: VehiclesService<T>,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vehiclePeripheralsService: VehiclePeripheralsService,
    private vehicleModelsService: VehicleModelsService,
    private vehicleModelTypesService: VehicleModelTypesService,
    private vehicleManufacturersService: VehicleManufacturersService,
    private customersService: CustomersService,
  ) {
    super(service, message, activatedRoute);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.customersService.getAll({ limit: 999 }).subscribe((customers) => {
      this.customers = customers.results;
    });
    this.vehicleManufacturersService.getAll({ limit: 999 }).subscribe((manufacturers) => {
      this.manufacturers = manufacturers.results;
    });
    this.vehiclePeripheralsService.getAll({ limit: 999 }).subscribe((peripherals) => {
      this.peripherals = peripherals.results;
    });
    (this.service as any).getWorkingSituations().subscribe((workingSituations) => {
      this.workingSituations = workingSituations;
    });

    if (this.resource?.vehicle.manufacturer) {
      this.loadModels();
    }
    if (this.resource?.vehicle.vehicleModel) {
      this.selectType();
    }
  }

  loadFormBuilder(customProperties?: string[]): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      manufacturer: [null, [Validators.required]],
      vehicleModel: [null, [Validators.required]],
      vehicleModelType: [null, [Validators.required]],
      peripherals: [[], []],
      workingSituation: [null, [Validators.required]],
      plate: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],
      chassis: [null, [Validators.required]],
      renavam: [null, [Validators.required]],
      description: [null, [Validators.required]],
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
      customer: this.resource.vehicle.customer,
      manufacturer: this.resource.vehicle.manufacturer,
      vehicleModel: this.resource.vehicle.vehicleModel,
      vehicleModelType: this.resource.vehicle.vehicleModelType,
      peripherals: this.resource.vehicle.peripherals,
      workingSituation: this.resource.vehicle.workingSituation,
      plate: this.resource.vehicle.plate,
      state: this.resource.vehicle.state,
      city: this.resource.vehicle.city,
      color: this.resource.vehicle.color,
      year: this.resource.vehicle.year,
      chassis: this.resource.vehicle.chassis,
      renavam: this.resource.vehicle.renavam,
      description: this.resource.vehicle.description,
    });

    customProperties?.forEach(property => {
      this.validateForm.patchValue({
        [property]: this.resource[property]
      });
    });
  }

  loadModels(): void {
    this.vehicleModelsService
      .getAll({ limit: 999 }, this.validateForm.controls.manufacturer.value)
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

  private handleSaveError(error: HttpErrorResponse): void {
    if (error.error.extra.fields === 'No fields were updated.') {
      return super.handleSuccess();
    }

    super.handleError();
  }
}
