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

  driversNextUrl: string;
  trucksNextUrl: string;
  customersNextUrl: string;
  operationsNextUrl: string;
  wagonsNextUrl: string;
  isLoadingMoreData = false;

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

    this.isLoading = true;

    this.stopsService.getAll({ limit: 999 }).subscribe((stops) => {
      this.stops = stops.results;
    });
    this.loadMoreCustomers();
    this.loadMoreDrivers();
    this.loadMoreTrucks();
    this.loadMoreOperations();
    this.loadMoreWagons();
    (this.service as MonitoringRequestsService).getSurveyConductors().subscribe((surveyConductors) => {
      this.surveyConductors = surveyConductors;
    });
    (this.service as MonitoringRequestsService).getMonitoringRequests().subscribe((monitoringRequests) => {
      this.monitoringRequests = monitoringRequests;
    });
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

    if (this.resource?.driver) {
      this.driversService.get(this.resource.driver.id).subscribe((driver) => {
        this.drivers = [driver, ...this.drivers];
      });
    }

    if (this.resource?.auxiliaryDriver) {
      this.driversService.get(this.resource.auxiliaryDriver.id).subscribe((driver) => {
        this.drivers = [driver, ...this.drivers];
      });
    }

    if (this.resource?.truck) {
      this.trucksService.get(this.resource.truck.id).subscribe((truck) => {
        this.trucks = [truck, ...this.trucks];
      });
    }

    if (this.resource?.shipper) {
      this.customersService.get(this.resource.shipper.id).subscribe((customer) => {
        this.customers = [customer, ...this.customers];
      });
    }

    if (this.resource?.transporter) {
      this.customersService.get(this.resource.transporter.id).subscribe((customer) => {
        this.customers = [customer, ...this.customers];
      });
    }

    if (this.resource?.operation) {
      this.operationService.get(this.resource.operation.id).subscribe((operation) => {
        this.operations = [operation, ...this.operations];
      });
    }

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

  save(): void {
    this.modal.confirm({
      nzTitle: 'Deseja enviar a solicitação?',
      nzContent: 'Ao enviar a solicitação, não será mais possível editá-la.',
      nzOnOk: () => {
        this.isLoading = true;
        (this.service as MonitoringRequestsService).send(
          this.resource.id,
        ).subscribe(
          () => {
            this.message.success('Solicitação enviada com sucesso!');
            this.isLoading = false;
            this.list();
          },
          () => {
            this.isLoading = false;
            this.message.error('Erro ao enviar a solicitação!');
          });
      },
    });
  }

  loadMoreDrivers(): void {
    this.isLoadingMoreData = true;
    this.driversService.getAll({
      limit: 999,
      url: this.driversNextUrl
    }).subscribe((drivers) => {
      this.driversNextUrl = drivers.next;
      this.drivers = [...this.drivers, ...drivers.results];
      this.isLoadingMoreData = false;
    });
  }

  loadMoreTrucks(): void {
    this.isLoadingMoreData = true;
    this.trucksService.getAll({
      limit: 999,
      url: this.trucksNextUrl
    }).subscribe((trucks) => {
      this.trucksNextUrl = trucks.next;
      this.trucks = [...this.trucks, ...trucks.results];
      this.isLoadingMoreData = false;
    });
  }

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customersService.getAll({
      limit: 999,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
    });
  }

  loadMoreOperations(): void {
    this.isLoadingMoreData = true;
    this.operationService.getAll({
      limit: 999,
      url: this.operationsNextUrl
    }).subscribe((operations) => {
      this.operationsNextUrl = operations.next;
      this.operations = [...this.operations, ...operations.results];
      this.isLoadingMoreData = false;
    });
  }

  loadMoreWagons(): void {
    this.isLoadingMoreData = true;
    this.wagonsService.getAll({
      limit: 999,
      url: this.wagonsNextUrl
    }).subscribe((wagons) => {
      this.wagonsNextUrl = wagons.next;
      this.wagons = [...this.wagons, ...wagons.results];
      this.isLoadingMoreData = false;
    });
  }
}
