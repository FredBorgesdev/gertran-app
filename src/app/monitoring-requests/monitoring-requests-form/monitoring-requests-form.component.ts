import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MonitoringRequestsService, MonitoringRequests } from '../monitoring-requests.service';
import { BaseCrudFormComponent } from '../../base-crud/base-crud-form/base-crud-form.component';
import {RoutesService} from '../../routes/routes.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Stop, StopsService} from '../../stops/stops.service';
import {Customer, CustomersService} from '../../customers/customers.service';
import {Driver, DriversService} from '../../drivers/drivers.service';
import {Truck, TrucksService} from '../../trucks/trucks.service';
import {Wagon, WagonsService} from '../../wagons/wagons.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Choice} from '../../shared/services/api.service';
import {Operations, OperationsService} from '../../operations/operations.service';

@Component({
  selector: 'app-monitoring-requests-form',
  templateUrl: './monitoring-requests-form.component.html',
  styleUrls: ['./monitoring-requests-form.component.css'],
})
export class MonitoringRequestsFormComponent extends BaseCrudFormComponent<MonitoringRequests> implements OnInit {
  stops: Stop[] = [];
  customers: Customer[] = [];
  drivers: Driver[] = [];
  trucks: Truck[] = [];
  wagons: Wagon[] = [];
  surveyConductors: Choice[] = [];
  monitoringRequests: Choice[] = [];

  operations: Operations[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private routesService: RoutesService,
    private i18n: NzI18nService,
    private stopsService: StopsService,
    private customersService: CustomersService,
    private driversService: DriversService,
    private trucksService: TrucksService,
    private wagonsService: WagonsService,
    private operationService: OperationsService,
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

    this.stopsService.getAll({ limit: 999 }).subscribe((stops) => {
      this.stops = stops.results;
    });
    this.customersService.getAll({ limit: 999 }).subscribe((customers) => {
      this.customers = customers.results;
    });
    this.driversService.getAll({ limit: 999 }).subscribe((drivers) => {
      this.drivers = drivers.results;
    });
    this.trucksService.getAll({ limit: 999 }).subscribe((trucks) => {
      this.trucks = trucks.results;
    });
    this.wagonsService.getAll({ limit: 999 }).subscribe((wagons) => {
      this.wagons = wagons.results;
    });
    this.operationService.getAll({ limit: 999 }).subscribe((operations) => {
      this.operations = operations.results;
    });
    (this.service as MonitoringRequestsService).getSurveyConductors().subscribe((surveyConductors) => {
      this.surveyConductors = surveyConductors;
    });
    (this.service as MonitoringRequestsService).getMonitoringRequests().subscribe((monitoringRequests) => {
      this.monitoringRequests = monitoringRequests;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      transporter: [null, []],
      shipper: [null, []],
      address: [null, []],
      truck: [null, []],

      wagons: [[], []],

      operation: [null, []],
      loadDescription: [null, []],
      notes: [null, []],
      isSimulation: [false, []],
      surveyConductedBy: [null, []],
      driver: [null, []],
      auxiliaryDriver: [null, []],
    });
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues();

    this.validateForm.patchValue({
      shipper: this.resource.shipper?.id,
      transporter: this.resource.transporter?.id,
      driver: this.resource.driver?.id,
      auxiliaryDriver: this.resource.auxiliaryDriver?.id,
      truck: this.resource.truck?.id,
      operation: this.resource.operation?.id,
      wagons: this.resource.wagons?.map((wagon) => wagon.id),
    });
  }

  list(): void {
    this.router.navigate(['/monitoring-requests/monitoring-requests-list']);
  }

  saveDraft(field: string): void {
    const formControl = this.validateForm.get(field);

    if (formControl.dirty) {
      this.service.update(
        this.resource.id,
        { [field]: formControl.value } as any
      ).subscribe(() => {
        this.message.success('Rascunho salvo com sucesso!');
      });
    }
  }
}
