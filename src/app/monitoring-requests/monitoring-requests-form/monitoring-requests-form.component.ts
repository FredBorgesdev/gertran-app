import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {MonitoringRequests, MonitoringRequestsService} from '../monitoring-requests.service';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Stop, StopsService} from '../../stops/stops.service';
import {Driver, DriversService} from '../../drivers/drivers.service';
import {TrucksService} from '../../trucks/trucks.service';
import {WagonsService} from '../../wagons/wagons.service';
import {Choice} from '../../shared/services/api.service';
import {Operations, OperationsService} from '../../operations/operations.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import User from '../../users/user';
import {createNumberMask} from 'text-mask-addons';
import {SelectableTruckService} from '../../trucks/selectable-truck.service';
import {SelectableWagonService} from '../../wagons/selectable-wagon.service';
import {SelectableDriversService} from '../../drivers/selectable-drivers.service';
import {SharedOperationsItem, SharedOperationsService} from "../../customers/shared-operations.service";

@Component({
  selector: 'app-monitoring-requests-form',
  templateUrl: './monitoring-requests-form.component.html',
  styleUrls: ['./monitoring-requests-form.component.css'],
})
export class MonitoringRequestsFormComponent extends BaseCrudFormComponent<MonitoringRequests> implements OnInit {
  stops: Stop[] = [];
  drivers: Driver[] = [];
  surveyConductors: Choice[] = [];
  monitoringRequests: Choice[] = [];

  operations: Operations[] = [];
  sharedOperations: SharedOperationsItem[] = [];

  driversNextUrl: string;
  trucksNextUrl: string;
  operationsNextUrl: string;
  wagonsNextUrl: string;
  isLoadingMoreData = false;

  reaisMask = createNumberMask({
    prefix: 'R$ ',
    allowDecimal: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private stopsService: StopsService,
    private driversService: DriversService,
    private trucksService: TrucksService,
    private wagonsService: WagonsService,
    private operationService: OperationsService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public selectableTruckService: SelectableTruckService,
    public selectableWagonService: SelectableWagonService,
    public selectableDriverService: SelectableDriversService,
    public authService: AuthenticationService,
    private sharedOperationsService: SharedOperationsService,
    activatedRoute: ActivatedRoute,
    service: MonitoringRequestsService,
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

    this.isLoading = true;

    this.stopsService.getAll({limit: 50}).subscribe((stops) => {
      this.stops = stops.results;
    });

    this.selectableTruckService.init();
    this.selectableWagonService.init();
    this.selectableDriverService.init();

    this.loadCustomers();
    (this.service as MonitoringRequestsService).getSurveyConductors().subscribe((surveyConductors) => {
      this.surveyConductors = surveyConductors;
    });
  }

  loadCustomers(): void {
    if (
      !this.authService.customerId ||
      this.resource?.customer?.shippers?.length > 0
    ) {
      return this.selectableCustomerService.init();
    }
  }

  get disabled(): boolean {
    return this.resource?.status !== 'draft';
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      transporter: [null, []],
      shipper: [null, []],
      address: [null, []],
      truck: [null, []],
      wagons: [[], []],
      operation: [null, []],
      sharedOperation: [null, []],
      loadDescription: [null, []],
      loadValue: [null, []],
      loadType: [null, []],
      mainStepName: [null, []],
      notes: [null, []],
      surveyConductedBy: [null, []],
      surveyConductedByOthers: [null, []],
      driver: [null, []],
      auxiliaryDriver: [null, []],
    });

    this.validateForm.get('transporter').valueChanges.subscribe((value) => {
      this.operations = [];
      this.loadMoreOperations();
      this.loadSharedOperations();
    });
    this.validateForm.get('shipper').valueChanges.subscribe((value) => {
      if (this.showShipperSelect) {
        this.operations = [];
        this.loadMoreOperations();
        this.loadSharedOperations();
      }
    });
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues({
      ignoreKeys: [
        'shipper',
        'transporter',
        'driver',
        'auxiliaryDriver',
        'truck',
        'operation',
        'wagons',
        'loadValue',
      ]
    });

    if (this.resource?.driver) {
      this.driversService.get(this.resource.driver.id).subscribe((driver) => {
        this.selectableDriverService.appendDriver(driver);
      });
    }

    if (this.resource?.auxiliaryDriver) {
      this.driversService.get(this.resource.auxiliaryDriver.id).subscribe((driver) => {
        this.selectableDriverService.appendDriver(driver);
      });
    }

    if (this.resource?.truck) {
      this.trucksService.get(this.resource.truck.id).subscribe((truck) => {
        this.selectableTruckService.appendTruck(truck);
      });
    }

    if (this.resource?.shipper) {
      this.selectableCustomerService.appendCustomer(this.resource.shipper);
    }

    if (this.resource?.transporter) {
      this.selectableCustomerService.appendCustomer(this.resource.transporter);
    }

    if (this.resource?.operation) {
      this.operationService.get(this.resource.operation.id).subscribe((operation) => {
        this.operations = [operation, ...this.operations];
      });
    }

    if (this.resource?.sharedOperation) {
      this.sharedOperations = [this.resource?.sharedOperation, ...this.sharedOperations];
    }

    this.validateForm.patchValue({
      shipper: this.resource.shipper?.id,
      transporter: this.resource.transporter?.id,
      driver: this.resource.driver?.id,
      auxiliaryDriver: this.resource.auxiliaryDriver?.id,
      truck: this.resource.truck?.id,
      operation: this.resource.operation?.id,
      sharedOperation: this.resource.sharedOperation?.id,
      wagons: this.resource.wagons?.map((wagon) => wagon.id),
      loadValue: this.resource.loadValue ? this.resource.loadValue.toString().replace('.', ',') : null,
    });

    this.loadTransporterData();
  }

  list(): void {
    this.router.navigate(['/monitoring-requests/monitoring-requests-list']);
  }

  sanitizeInputAndSaveDraft(field: string): void {
    const formControl = this.validateForm.get(field);
    const newValue = formControl.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.');

    this.saveDraft(field, newValue);
  }

  saveDraft(field: string, newValue?: string): void {
    const formControl = this.validateForm.get(field);

    if (formControl.dirty) {
      this.service.update(
        this.resource.id,
        {[field]: newValue || formControl.value} as any
      ).subscribe(() => {
        this.message.success('Rascunho salvo com sucesso!');
      });
    }
  }

  loadMoreOperations(): void {
    const customerId = this.getCustomerId();

    if (!customerId) {
      return;
    }

    this.isLoadingMoreData = true;
    this.operationService.getAll({
      limit: 50,
      url: this.operationsNextUrl,
    }, {
      customer: customerId,
    }).subscribe((operations) => {
      this.operationsNextUrl = operations.next;
      this.operations = [...this.operations, ...operations.results];
      this.isLoadingMoreData = false;
    });
  }

  get surveyConductedRowSpan(): number {
    return this.validateForm.controls.surveyConductedBy.value === 'others' ? 12 : 24;
  }

  get shouldShowSurveyConductorInput(): boolean {
    return this.validateForm.controls.surveyConductedBy.value === 'others';
  }

  get user(): User {
    return this.authService.user;
  }

  get showShipperSelect(): boolean {
    return this.resource?.customer?.shippers?.length > 0;
  }

  loadTransporterData(): void {
    this.selectableDriverService.resetFilters();
    this.selectableTruckService.resetFilters();
    this.selectableWagonService.resetFilters();
    this.saveDraft('transporter');
  }

  searchTruckByPlate(plate: string): void {
    this.selectableTruckService.searchByPlate({
      plate,
    });
  }

  filterByWagonByPlate(plate: string): void {
    this.selectableWagonService.searchByPlate({
      plate,
    });
  }

  private loadSharedOperations(): void {
    const customerId = this.getCustomerId();

    if (!customerId) {
      return;
    }

    this.sharedOperationsService.getAll({}, customerId).subscribe((operations) => {
      this.sharedOperations = operations.results;
    });
  }

  private getCustomerId(): string {
    const transporterId = this.validateForm.get('transporter').value?.id ||
      this.validateForm.get('transporter').value;
    const shipperId = this.validateForm.get('shipper').value?.id ||
      this.validateForm.get('shipper').value;

    return shipperId || transporterId;
  }
}
