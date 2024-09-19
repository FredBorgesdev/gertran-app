import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoutesService} from '../../routes/routes.service';
import {BLANK_ROUTE} from '../routes-modal/routes-modal.component';
import {ActivatedRoute} from '@angular/router';
import polyline from '@mapbox/polyline';

import {MapModalComponent} from '../map-modal/map-modal.component';
import {environment} from '../../../environments/environment';
import {addSeconds, differenceInDays, differenceInHours, format, setHours} from 'date-fns';
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
import {SelectablePointService} from "../../stops/selectable-point.service";
import {googlePlacesOptions} from "../../shared/data/google-places-options";
import brazilianStates from "../../shared/data/brazilian-states";
import {AddressSelectComponent} from "../../shared/address-select/address-select.component";

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
  googlePlacesOptions = googlePlacesOptions;

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
    public selectablePointService: SelectablePointService,
  ) {
  }

  ngOnInit(): void {
    this.selectablePointService.init();

    this.validateForm = this.formBuilder.group({
      points: this.formBuilder.array([]),
      chosenPoint: [BLANK_ROUTE.id],
    });

    this.pointService.getTypes().subscribe((pointTypes) => {
      this.pointTypes = pointTypes;
    });

    this._routeCoordinates = this.monitoringRequest.routeCoordinates;

    this.isLoading = true;
    this.service.getAll({limit: 50}, this.monitoringRequest.id).subscribe((points) => {
      points.results.forEach((point) => {
        const formGroup = this.addPoint();
        const pointWithDate = {
          ...point,
          date: new Date(`${point.date} ${point.time}`),
        };
        formGroup.patchValue(pointWithDate);
      });

      const {firstPoint, waypoints, lastPoint} = this.setPointsCorrectTypes();
      this.validateForm.patchValue({
        points: [
          firstPoint?.value,
          ...waypoints?.map((point) => point.value),
          lastPoint?.value,
        ],
      });
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar paradas');
    });

    const {routeId} = this.activatedRoute.snapshot.queryParams || {};
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

  addPoint(markAsDirty = false): FormGroup {
    const chosenPoint = this.validateForm.get('chosenPoint').value;
    const isFirstPoint = (this.getPointsControls().length === 0); // Verifica se é o primeiro ponto
    const formGroup = new FormGroup({
      id: new FormControl(null),
      pointId: new FormControl(null),
      address: new FormControl(chosenPoint?.address, [Validators.required]),
      latitude: new FormControl(
        Number(chosenPoint?.latitude || 0).toFixed(6),
        [Validators.required]
      ),
      longitude: new FormControl(
        Number(chosenPoint?.longitude || 0).toFixed(6),
        [Validators.required]
      ),
      date: new FormControl(new Date().setMinutes(new Date().getMinutes() + 15), [Validators.required]),
      pointType: new FormControl(
        isFirstPoint == true ? PointTypes.START : chosenPoint?.pointType, // Define "start" para o primeiro ponto
        [Validators.required]
      ),
      state: new FormControl(chosenPoint?.state, [Validators.required]),
      city: new FormControl(chosenPoint?.city, [Validators.required]),
      zipCode: new FormControl(chosenPoint?.zipCode, []),
    });

    (this.validateForm.get('points') as FormArray).push(formGroup);

    this.setPointsCorrectTypes();

    if (markAsDirty) {
      formGroup.markAsDirty();
    }

    return this.getPointsControls()[this.getPointsControls().length - 1];
  }

  async removePoint(index: number): Promise<void> {
    const point = this.getPointsControls()[index]?.value;
    if (!point?.id) {
      (this.validateForm.get('points') as FormArray).removeAt(index);
      this._routeCoordinates = (await this.getRouteCoordinates()).coordinates;

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
              this._routeCoordinates = routeCoordinates.coordinates;
            })
            .catch((e) => {
              console.log('Error calculating route', e);
            });

          this.isLoading = false;
        });
      }
    });
  }

  async handleAddressChange(nominatimAddress: any, formGroup: FormGroup): Promise<void> {
    const city =
      nominatimAddress.address.city ||
      nominatimAddress.address.town ||
      nominatimAddress.address.village ||
      nominatimAddress.address.municipality;
    const state = brazilianStates.find(
      ({name}) => name === nominatimAddress.address.state
    ).abbreviation;
    const latitude = Number(nominatimAddress.lat).toFixed(6);
    const longitude = Number(nominatimAddress.lon).toFixed(6);
    const zipCode = nominatimAddress.address.postcode;

    formGroup.patchValue({
      latitude,
      longitude,
      state,
      city,
      zipCode,
    });

    this._routeCoordinates = (await this.getRouteCoordinates()).coordinates;
    this.calculateEtaForAllPoints().then();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.getPointsControls(), event.previousIndex, event.currentIndex);
    this.calculateEtaForAllPoints().then();
    this.setPointsCorrectTypes();
  }

  setPointsCorrectTypes(): {
    firstPoint: FormGroup,
    waypoints: FormGroup[],
    lastPoint: FormGroup,
  } {
    const pointControls = this.getPointsControls();
    const firstPoint = pointControls.find(
      (formGroup) => formGroup.value.pointType === 'start'
    ) || pointControls[0];
    const lastPoint =  pointControls[pointControls.length - 1];
    const waypoints = pointControls.slice(1, pointControls.length - 1);

    firstPoint?.patchValue({pointType: PointTypes.START});
    waypoints?.forEach((point) => {
      point.patchValue({pointType: PointTypes.WAYPOINT});
    });

    if(pointControls.length > 1){
      lastPoint?.patchValue({pointType: PointTypes.END});
    }

    return {
      firstPoint,
      waypoints,
      lastPoint,
    }
  }

  async calculateEtaForAllPoints(): Promise<void> {
    // // TODO
    // return;
    //#hmn*
    const points = this.getPointsControls();
    // points[0]?.patchValue({date: points[0]?.value.date || new Date()});

    for (let index = 1; index < points.length; index++) {
      const previousPoint = points[index - 1];
      const currentPoint = points[index];
      // if (!previousPoint || !currentPoint) {
      //   return;
      // }

      // TODO: double check
      // skip if current point is greater than previous point
      // if (currentPoint.value.date > previousPoint.value.date) {
      //   continue;
      // }

      const eta = await this.calculateETA(
        {lat: previousPoint.value.latitude, lng: previousPoint.value.longitude},
        {lat: currentPoint.value.latitude, lng: currentPoint.value.longitude},
      );

      // if (!eta) {
      //   return;
      // }

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
      directions.on('route', ({route}) => {
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
      this.isLoading = false;
      this.message.error('Preencha todos os campos');
      return;
    }

    const routeCoordinates = await this.getRouteCoordinates();
    this.updateRouteCoordinates.emit(routeCoordinates);
    this._routeCoordinates = routeCoordinates.coordinates;

    const operations = pointsWithOrder.map((point) => {
      const address = point.address instanceof Object ? point.address.displayName : point.address;
      const payload = {
        ...point,
        address: AddressSelectComponent.enhanceOutputAddress(address)
      };
      if (point.id) {
        return this.service.update(point.id, payload, this.monitoringRequest.id);
      }

      return this.service.save(payload, this.monitoringRequest.id);
    });

    this.calculateEtaForAllPoints().then();

    if (operations.length === 0) {
      this.handleSuccess();
      return;
    }

    forkJoin(operations).subscribe(
      () => this.handleSuccess(),
      () => this.handleError(),
    );
  }

  async getRouteCoordinates(): Promise<any> {
    const routeCoordinates = await this.directionsService.getDirections(
      this.getPointsControls().map((point) => point.value),
    );

    if (!routeCoordinates.route[0]) {
      return [];
    }

    const directionsGeoJson = polyline.toGeoJSON(routeCoordinates.route[0]?.geometry);

    return {
      route: routeCoordinates.route[0],
      coordinates: directionsGeoJson.coordinates
    };
  }

  getChangedPointsWithOrder(): any[] {
    return this.getPointsControls().reduce((acc, point, index) => {
      if (!point.dirty) {
        return acc;
      }

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

      if (
        previousPoint &&
        differenceInDays(current, previousPoint.value.date) < 0
      ) {
        return true;
      }

      return differenceInDays(current, new Date()) < 0;
    };
  }

  private handleSuccess(): void {
    this.isLoading = false;
    this.message.success('Pontos salvos com sucesso!');
    this.validateForm.markAsPristine();
    this.showMap()
  }

  private handleError(): void {
    this.isLoading = false;
    this.message.error('Erro ao salvar pontos!');
  }
}
