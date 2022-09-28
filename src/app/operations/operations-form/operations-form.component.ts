import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OperationsService, Operations } from '../operations.service';
import { BaseCrudFormComponent } from '../../base-crud/base-crud-form/base-crud-form.component';
import {Customer, CustomersService} from '../../customers/customers.service';
import {TrackerTechnologiesModels, TrackerTechnologiesModelsService} from '../../tracker-technologies/tracker-technologies-models.service';
import {TrackerTechnologies, TrackerTechnologiesService} from '../../tracker-technologies/tracker-technologies.service';
import {VehicleModelTypes, VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import {VehiclePeripherals, VehiclePeripheralsService} from '../../vehicle-peripherals/vehicle-peripherals.service';
import {InsuranceCompaniesService, InsuranceCompany} from '../../insurance-companies/insurance-companies.service';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-operations-form',
  templateUrl: './operations-form.component.html',
  styleUrls: ['./operations-form.component.css'],
})
export class OperationsFormComponent extends BaseCrudFormComponent<Operations> implements OnInit {
  customers: Customer[] = [];
  trackerTechnologies: (TrackerTechnologies & { models?: TrackerTechnologiesModels[] })[] = [];
  vehicleModelTypes: VehicleModelTypes[] = [];
  vehiclePeripherals: VehiclePeripherals[] = [];
  insuranceCompanies: InsuranceCompany[] = [];

  reaisMask = createNumberMask({
    prefix: 'R$ ',
    allowDecimal: true,
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private customersService: CustomersService,
    private trackerTechnologiesModelsService: TrackerTechnologiesModelsService,
    private trackerTechnologiesService: TrackerTechnologiesService,
    private vehicleModelTypesService: VehicleModelTypesService,
    private vehiclePeripheralsService: VehiclePeripheralsService,
    private insuranceCompaniesService: InsuranceCompaniesService,
    activatedRoute: ActivatedRoute,
    service: OperationsService,
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

    this.i18n.setLocale(en_US);

    this.customersService.getAll({ limit: 999 }).subscribe((customers) => {
      this.customers = customers.results;
    });
    this.trackerTechnologiesService.getAll({ limit: 999 }).subscribe(trackerTechnologiesModels => {
      this.trackerTechnologies = trackerTechnologiesModels.results;

      this.trackerTechnologies.forEach(trackerTechnology => {
        this.trackerTechnologiesModelsService.getAll({ limit: 999 }, trackerTechnology.id).subscribe(data => {
          trackerTechnology.models = data.results;
        });
      });
    });
    this.vehicleModelTypesService.getAll({ limit: 999 }).subscribe(vehicleModelTypes => {
      this.vehicleModelTypes = vehicleModelTypes.results;
    });
    this.vehiclePeripheralsService.getAll({ limit: 999 }).subscribe(vehiclePeripherals => {
      this.vehiclePeripherals = vehiclePeripherals.results;
    });
    this.insuranceCompaniesService.getAll({ limit: 999 }).subscribe(insuranceCompanies => {
      this.insuranceCompanies = insuranceCompanies.results;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      allowedTrackerModels: [[], [Validators.required]],
      allowedTruckTypes: [[], [Validators.required]],
      allowedWagonTypes: [[], [Validators.required]],
      requiredPeripherals: [[], [Validators.required]],
      insuranceCompany: [null, [Validators.required]],
      authorizedAutomaticMonitoring: [false, [Validators.required]],
      followMonitoring: [false, [Validators.required]],
      isMain: [false, [Validators.required]],
      isDdr: [false, [Validators.required]],
      operationType: [null, [Validators.required]],
      radiusToActivateRouteDeviation: [null, [Validators.required]],
      policyEffectiveDate: [null, [Validators.required]],
      brokerName: [null, [Validators.required]],
      brokerPhone: [null, [Validators.required]],
      brokerPersonInCharge: [null, [Validators.required]],
      //
      rules: this.formBuilder.array([]),
      positions: this.formBuilder.array([])
    });
  }

  getRulesControls(): FormGroup[] {
    return (this.validateForm.controls.rules as any).controls;
  }

  addRule(): void {
    (this.validateForm.controls.rules as any).push(this.formBuilder.group({
      minValue: [null, [Validators.required]],
      maxValue: [null, [Validators.required]],
      minRedundancy: [null, [Validators.required]],
      armedGuard: [null, [Validators.required]],
      bait: [null, [Validators.required]],
    }));
  }

  removeRule(index: number): void {
    (this.validateForm.controls.rules as any).removeAt(index);
  }

  getPositionsControls(): FormGroup[] {
    return (this.validateForm.controls.positions as any).controls;
  }

  addPosition(): void {
    (this.validateForm.controls.positions as any).push(this.formBuilder.group({
      positionTime: [null, [Validators.required]],
      area: [null, [Validators.required]],
      startAt: [null, [Validators.required]],
      endAt: [null, [Validators.required]],
      tolerance: [null, [Validators.required]],
    }));
  }

  removePosition(index: number): void {
    (this.validateForm.controls.positions as any).removeAt(index);
  }

  list(): void {
    this.router.navigate(['/operations/operations-list']);
  }
}
