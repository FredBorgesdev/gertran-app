import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {OperationsService, Operations} from '../operations.service';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {CustomersService} from '../../customers/customers.service';
import {
  TrackerTechnologiesModels,
  TrackerTechnologiesModelsService
} from '../../tracker-technologies/tracker-technologies-models.service';
import {TrackerTechnologies, TrackerTechnologiesService} from '../../tracker-technologies/tracker-technologies.service';
import {VehicleModelTypes, VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import {VehiclePeripherals, VehiclePeripheralsService} from '../../vehicle-peripherals/vehicle-peripherals.service';
import {InsuranceCompaniesService, InsuranceCompany} from '../../insurance-companies/insurance-companies.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Choice} from '../../shared/services/api.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {find, propEq, pluck} from 'ramda';

type TrackerTechnologiesWithModels = TrackerTechnologies & { models?: TrackerTechnologiesModels[] }

@Component({
  selector: 'app-operations-form',
  templateUrl: './operations-form.component.html',
  styleUrls: ['./operations-form.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class OperationsFormComponent extends BaseCrudFormComponent<Operations> implements OnInit {
  @Input() operation: Operations = null;

  trackerTechnologies: TrackerTechnologiesWithModels[] = [];
  truckTypes: VehicleModelTypes[] = [];
  wagonTypes: VehicleModelTypes[] = [];
  vehiclePeripherals: VehiclePeripherals[] = [];
  insuranceCompanies: InsuranceCompany[] = [];
  brokerInsuranceCompanies: InsuranceCompany[] = [];
  operationTypes: Choice[] = [];

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
    public selectableCustomerService: SelectableCustomerServiceService,
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

  loadResource(): void {
    if (!this.operation) {
      return;
    }

    this.resource = this.operation;
    this.performResourceChange();
    this.performFormGroupSetValues();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.i18n.setLocale(en_US);

    this.selectableCustomerService.init();

    this.trackerTechnologiesService.getAll({limit: 50}).subscribe(trackerTechnologiesModels => {
      this.trackerTechnologies = trackerTechnologiesModels.results;

      this.trackerTechnologies.forEach(trackerTechnology => {
        this.trackerTechnologiesModelsService.getAll({limit: 50}, trackerTechnology.id).subscribe(data => {
          trackerTechnology.models = data.results;
        });
      });
    });
    this.vehicleModelTypesService.getAll({limit: 50}).subscribe(vehicleModelTypes => {
      this.truckTypes = vehicleModelTypes.results.filter(({type}) => type === 'truck');
      this.wagonTypes = vehicleModelTypes.results.filter(({type}) => type === 'wagon');
    });
    this.vehiclePeripheralsService.getAll({limit: 50}).subscribe(vehiclePeripherals => {
      this.vehiclePeripherals = vehiclePeripherals.results;
    });
    this.insuranceCompaniesService.getAll({limit: 999}).subscribe(insuranceCompanies => {
      this.insuranceCompanies = insuranceCompanies.results.filter(
        company => !company.isBroker
      );
      this.brokerInsuranceCompanies = insuranceCompanies.results.filter(
        company => company.isBroker
      );
    });
    (this.service as OperationsService).getOperationTypes().subscribe(data => {
      this.operationTypes = data;
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
      authorizeAutomaticMonitoring: [false, [Validators.required]],
      followMonitoring: [false, [Validators.required]],
      isMain: [false, [Validators.required]],
      isDdr: [false, [Validators.required]],
      operationType: [null, [Validators.required]],
      radiusToActivateRouteDeviation: [null, [Validators.required]],
      policyEffectiveDate: [null, [Validators.required]],
      brokerName: [null, []],
      brokerPhone: [null, []],
      brokerPersonInCharge: [null, []],
      broker: [null]
    });
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues();

    this.validateForm.patchValue({
      allowedTrackerModels: this.resource.allowedTrackerModels?.map(({id}) => id),
      allowedTruckTypes: this.resource.allowedTruckTypes?.map(({id}) => id),
      allowedWagonTypes: this.resource.allowedWagonTypes?.map(({id}) => id),
      requiredPeripherals: this.resource.requiredPeripherals?.map(({id}) => id),
      insuranceCompany: this.resource.insuranceCompany?.id,
      broker: this.resource.broker?.id,
    });
  }

  list(): void {
    this.router.navigate(['/operations/operations-list']);
  }

  selectAllTrackerModels(ids: string[]): void {
    const id = ids[ids.length - 1];
    if (!id || this.isNotGroup(id)) {
      return;
    }

    const trackerTechnology = this.getTrackerTechnologyByGroupId(id);
    if (!trackerTechnology) {
      return;
    }

    const newAllowedTrackerModels = this.getTrackerTechnologiesIds(trackerTechnology);

    this.validateForm.patchValue({
      allowedTrackerModels: newAllowedTrackerModels
    });
  }

  private getTrackerTechnologiesIds(
    trackerTechnology: TrackerTechnologiesWithModels
  ): string[] {
    const trackerTechnologyModelsIds = pluck('id', trackerTechnology.models);
    const previousAllowedTrackerModels = this.validateForm.get(
      'allowedTrackerModels'
    ).value.filter(this.isNotGroup);

    return Array.from(
      new Set([...previousAllowedTrackerModels, ...trackerTechnologyModelsIds])
    );
  }

  private getTrackerTechnologyByGroupId(id: string): TrackerTechnologiesWithModels {
    const groupId = id.replace('group_', '');

    return find(propEq('id', groupId), this.trackerTechnologies);
  }

  private isNotGroup(id: string): boolean {
    return !id.startsWith('group_');
  }

  get trackerTechnologiesWithModels(): TrackerTechnologiesWithModels[] {
    return this.trackerTechnologies.filter(trackerTechnology => trackerTechnology.models?.length);
  }

  selectAll(
    ids: string[],
    field: string,
    list: (any & { id: string })[],
  ): void {
    const id = ids[ids.length - 1];
    if (!id || id !== 'all') {
      return;
    }

    this.validateForm.patchValue({
      [field]: pluck('id', list)
    });
  }

  protected handleSuccess(response?: any): void {
    this.message.success('Registro salvo com sucesso');
    this.router.navigate(['operations', 'operations-edit', response.id]);
    this.isLoading = false;
  }

  getValues(): Operations {
    const body = {...this.validateForm.value};

    if (body.brokerPhone === '') {
      delete body.brokerPhone;
    }

    if (body.brokerName === '') {
      delete body.brokerName;
    }

    if (body.brokerPersonInCharge === '') {
      delete body.brokerPersonInCharge;
    }

    return body;
  }
}
