import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoutesService} from '../../routes/routes.service';
import {BLANK_ROUTE} from '../routes-modal/routes-modal.component';
import {ActivatedRoute} from '@angular/router';
import polyline from '@mapbox/polyline';

import {MapModalComponent} from '../map-modal/map-modal.component';
import {environment} from '../../../environments/environment';
import {addSeconds, differenceInDays, format, isBefore, setHours} from 'date-fns';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Choice} from '../../shared/services/api.service';
import {PointTypes, Stop, StopsService} from '../../stops/stops.service';
import {TravelStepService} from '../travel-step.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {forkJoin} from 'rxjs';
import {DirectionsService} from '../../shared/services/directions.service';
import {MonitoringRequests} from '../monitoring-requests.service';

interface LatLng {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-points-tab',
  templateUrl: './points-tab.component.html',
  styleUrls: ['./points-tab.component.css']
})
export class PointsTabComponent implements OnInit {
  @Input() monitoringRequest: MonitoringRequests;
  @Output() updateRouteCoordinates = new EventEmitter<any[]>();

  isLoading = false;
  stops = [];
  validateForm: FormGroup;
  dateDefaultValue = setHours(new Date(), 0);
  pointTypes: Choice[] = [];

  _routeCoordinates: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private routesService: RoutesService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private pointService: StopsService,
    private service: TravelStepService,
    private message: NzMessageService,
    private directionsService: DirectionsService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      points: this.formBuilder.array([]),
      chosenPoint: [BLANK_ROUTE.id],
    });

    this.pointService.getTypes().subscribe((pointTypes) => {
      this.pointTypes = pointTypes;
    });

    this._routeCoordinates = this.monitoringRequest.routeCoordinates;

    this.isLoading = true;
    this.service.getAll({ limit: 50 }, this.monitoringRequest.id).subscribe((points) => {
      points.results.forEach((point) => {
        const formGroup = this.addPoint();
        const pointWithDate = {
          ...point,
          date: new Date(`${point.date} ${point.time}`),
        };
        formGroup.patchValue(pointWithDate);
      });

      this.setPointsCorrectTypes();
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar paradas');
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

  getPointsControls(): FormGroup[] {
    if (!this.validateForm) {
      return [];
    }
    return (this.validateForm.get('points') as FormArray).controls as FormGroup[];
  }

  addPoint(): FormGroup {
    const chosenPoint = this.validateForm.get('chosenPoint').value;
    const address = chosenPoint?.address || null;

    (this.validateForm.get('points') as FormArray).push(
      new FormGroup({
        id: new FormControl(null),
        pointId: new FormControl(null),
        address: new FormControl(address, [Validators.required]),
        latitude: new FormControl(null, [Validators.required]),
        longitude: new FormControl(null, [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        pointType: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipCode: new FormControl(null, []),
      }),
    );

    this.setPointsCorrectTypes().then();

    return this.getPointsControls()[this.getPointsControls().length - 1];
  }

  async removePoint(index: number): Promise<void> {
    const point = this.getPointsControls()[index]?.value;
    if (!point?.id) {
      (this.validateForm.get('points') as FormArray).removeAt(index);
      this._routeCoordinates = await this.getRouteCoordinates();

      return;
    }

    this.modal.confirm({
      nzTitle: 'Você tem certeza que deseja remover esse ponto?',
      nzOnOk: () => {
        this.isLoading = true;

        this.service.delete(point.id, this.monitoringRequest.id).subscribe(async () => {
          (this.validateForm.get('points') as FormArray).removeAt(index);
          this.getRouteCoordinates()
            .then((routeCoordinates) => {
              this._routeCoordinates = routeCoordinates;
            })
            .catch((e) => {
              console.log('Error calculating route', e);
            });

          this.isLoading = false;
        });
      }
    });
  }

  async handleAddressChange(address: any, formGroup: FormGroup): Promise<void> {
    const latitude = address.geometry?.location.lat().toFixed(6);
    const longitude = address.geometry?.location.lng().toFixed(6);
    const formattedAddress = address.formatted_address;
    const state = address.address_components.find((component) => component.types.includes('administrative_area_level_1')).short_name;
    const city = address.address_components.find((component) => component.types.includes('administrative_area_level_2')).short_name;
    const zipCode = address.address_components.find((component) => component.types.includes('postal_code'));

    formGroup.patchValue({
      address: formattedAddress,
      latitude,
      longitude,
      state,
      city,
      zipCode: zipCode?.longName ?? undefined,
    });

    this._routeCoordinates = await this.getRouteCoordinates();
    this.calculateEtaForAllPoints().then();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.getPointsControls(), event.previousIndex, event.currentIndex);
    this.calculateEtaForAllPoints().then();
    this.setPointsCorrectTypes().then();
  }

  async setPointsCorrectTypes(): Promise<void> {
    const firstPoint = this.getPointsControls()[0];
    const lastPoint = this.getPointsControls()[this.getPointsControls().length - 1];
    const waypoints = this.getPointsControls().slice(1, this.getPointsControls().length - 1);

    firstPoint?.patchValue({ pointType: PointTypes.START });
    waypoints?.forEach((point) => {
      point.patchValue({ pointType: PointTypes.WAYPOINT });
    });
    lastPoint?.patchValue({ pointType: PointTypes.END });
  }

  async calculateEtaForAllPoints(): Promise<void> {
    const points = this.getPointsControls();
    points[0]?.patchValue({ date: points[0]?.value.date || new Date() });

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
        date: addSeconds(previousPoint.value.date, eta),
      });
      currentPoint.markAsDirty();
    }
  }

  calculateETA(origin: LatLng, destination: LatLng): Promise<number> {
    if (!origin.lat || !destination.lat) {
      return Promise.resolve(0);
    }

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
        resolve(route[0]?.duration);
      });
    });
  }

  showMap(): void {
    this.modal.create({
      nzTitle: 'Mapa',
      nzWidth: '80%',
      nzContent: MapModalComponent,
      nzComponentParams: {
        points: this.getPointsControls().map((point) => point.value),
        routeCoordinates: this._routeCoordinates,
      }
    });
  }

  async save(): Promise<void> {
    this.isLoading = true;

    const pointsWithOrder = this.getChangedPointsWithOrder();

    const points = this.validateForm.get('points') as FormArray;
    if (!points.valid) {
      this.message.error('Preencha todos os campos');
      return;
    }

    const routeCoordinates = await this.getRouteCoordinates();
    this.updateRouteCoordinates.emit(routeCoordinates);
    this._routeCoordinates = routeCoordinates;

    const operations = pointsWithOrder.map((point) => {
      if (point.id) {
        return this.service.update(point.id, point, this.monitoringRequest.id);
      }

      return this.service.save(point, this.monitoringRequest.id);
    });

    if (operations.length === 0) {
      this.handleSuccess();
      return;
    }

    forkJoin(operations).subscribe(
      () => this.handleSuccess(),
      () => this.handleError(),
    );
  }

  async getRouteCoordinates(): Promise<any[]> {
    const routeCoordinates = await this.directionsService.getDirections(
      this.getPointsControls().map((point) => point.value),
    );

    if (!routeCoordinates.route[0]) {
      return [];
    }

    const directionsGeoJson = polyline.toGeoJSON(routeCoordinates.route[0]?.geometry);

    return directionsGeoJson.coordinates;
  }

  getChangedPointsWithOrder(): any[] {
    return this.getPointsControls().reduce((acc, point, index) => {
      if (!point.dirty) { return acc; }

      const pointWithOrder = {
        ...point.value,
        order: index,
        date: format(point.value.date, 'yyyy-MM-dd'),
        time: format(point.value.date, 'HH:mm:ss'),
      };

      return [...acc, pointWithOrder];
    }, []);
  }

  disabledDate(pointIndex: number): (current: Date) => boolean {
    return (current: Date) => {
      const previousPoint = this.getPointsControls()[pointIndex - 1];

      if (previousPoint && isBefore(current, previousPoint.value.date)) {
        return true;
      }

      return differenceInDays(current, new Date()) < 0;
    };
  }

  private handleSuccess(): void {
    this.isLoading = false;
    this.message.success('Pontos salvos com sucesso!');
  }

  private handleError(): void {
    this.isLoading = false;
    this.message.error('Erro ao salvar pontos!');
  }
}
