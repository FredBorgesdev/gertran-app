import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MonitoringRequestsService, MonitoringRequests } from '../monitoring-requests.service';
import { BaseCrudFormComponent } from '../../base-crud/base-crud-form/base-crud-form.component';
import {RoutesService} from '../../routes/routes.service';
import {BLANK_ROUTE} from '../routes-modal/routes-modal.component';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {addSeconds, setHours} from 'date-fns';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Stop, StopsService} from '../../stops/stops.service';
import {Customer, CustomersService} from '../../customers/customers.service';
import {Driver, DriversService} from '../../drivers/drivers.service';
import {Truck, TrucksService} from '../../trucks/trucks.service';
import {Wagon, WagonsService} from '../../wagons/wagons.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MapModalComponent} from '../map-modal/map-modal.component';
import {environment} from '../../../environments/environment';

interface LatLng {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-monitoring-requests-form',
  templateUrl: './monitoring-requests-form.component.html',
  styleUrls: ['./monitoring-requests-form.component.css'],
})
export class MonitoringRequestsFormComponent extends BaseCrudFormComponent<MonitoringRequests> implements OnInit {
  timeDefaultValue = setHours(new Date(), 0);

  stops: Stop[] = [];
  customers: Customer[] = [];
  drivers: Driver[] = [];
  trucks: Truck[] = [];
  wagons: Wagon[] = [];

  operations: any[] = [];

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
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      transporter: [null, [Validators.required]],
      shipper: [null, [Validators.required]],
      name: [null, [Validators.required]],
      chosenPoint: [BLANK_ROUTE.id],
      points: this.formBuilder.array([]),
      address: [null, [Validators.required]],
      truck: [null, [Validators.required]],
      firstWagon: [null, [Validators.required]],
      secondWagon: [null, [Validators.required]],
      operation: [null, [Validators.required]],
      loadingOrder: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      isSimulation: [false, [Validators.required]],
    });

    const { routeId } = this.activatedRoute.snapshot.queryParams || {};
    if (!routeId || routeId === BLANK_ROUTE.id) {
      return;
    }

    this.routesService.get(routeId).subscribe((route) => {
      for (const point of route.points) {
        const formGroup = this.addPoint();

        formGroup.patchValue({
          pointId: point.id,
          address: point.point,
          latitude: point.latitude,
          longitude: point.longitude,
        });
      }

      this.calculateEtaForAllPoints();
    });
  }

  async calculateEtaForAllPoints(): Promise<void> {
    const points = this.getPointsControls();
    points[0]?.patchValue({ time: new Date() });

    for (let index = 1; index < points.length; index++) {
      const previousPoint = points[index - 1];
      const currentPoint = points[index];

      if (!previousPoint || !currentPoint) {
        return;
      }

      const eta = await this.calculateETA(
        { lat: previousPoint.value.latitude, lng: previousPoint.value.longitude },
        { lat: currentPoint.value.latitude, lng: currentPoint.value.longitude },
      );
      currentPoint.patchValue({
        time: addSeconds(previousPoint.value.time, eta),
      });
    }
  }

  getPointsControls(): any {
    return (this.validateForm.get('points') as FormArray).controls;
  }

  addPoint(): FormGroup {
    const chosenPoint = this.validateForm.get('chosenPoint').value;
    const address = chosenPoint?.address || null;

    (this.validateForm.get('points') as FormArray).push(
      new FormGroup({
        pointId: new FormControl(null),
        address: new FormControl(address, [Validators.required]),
        latitude: new FormControl(null),
        longitude: new FormControl(null),
        time: new FormControl(null),
      }),
    );

    return this.getPointsControls()[this.getPointsControls().length - 1];
  }

  removePoint(index: number): void {
    (this.validateForm.get('points') as FormArray).removeAt(index);
  }

  handleAddressChange(address: any, formGroup: FormGroup): void {
    const latitude = address.geometry?.location.lat();
    const longitude = address.geometry?.location.lng();
    const formattedAddress = address.formatted_address;

    formGroup.patchValue({
      address: formattedAddress,
      latitude,
      longitude,
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.getPointsControls(), event.previousIndex, event.currentIndex);
    this.calculateEtaForAllPoints();
  }

  list(): void {
    this.router.navigate(['/monitoring-requests/monitoring-requests-list']);
  }

  calculateETA(origin: LatLng, destination: LatLng): Promise<number> {
    return new Promise((resolve, reject) => {
      const directions = new MapboxDirections({
        accessToken: environment.mapboxAccessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        controls: {
          inputs: false,
          instructions: false,
          profileSwitcher: false
        },
        geocoder: {
          geometries: 'geojson',
        },
      });
      directions.setOrigin([origin.lng, origin.lat]);
      directions.setDestination([destination.lng, destination.lat]);
      directions.on('route', ({ route }) => {
        resolve(route[0].duration);
      });
    });
  }

  showMap(): void {
    this.modal.create({
      nzTitle: 'Mapa',
      nzContent: MapModalComponent,
      nzComponentParams: {
        points: this.getPointsControls().map((point) => point.value),
      }
    });
  }
}
