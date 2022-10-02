import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoutesService} from '../../routes/routes.service';
import {BLANK_ROUTE} from '../routes-modal/routes-modal.component';
import {ActivatedRoute} from '@angular/router';

import {MapModalComponent} from '../map-modal/map-modal.component';
import {environment} from '../../../environments/environment';
import {addSeconds, setHours} from 'date-fns';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {NzModalService} from 'ng-zorro-antd/modal';

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
  stops = [];
  validateForm: FormGroup;
  timeDefaultValue = setHours(new Date(), 0);

  constructor(
    private formBuilder: FormBuilder,
    private routesService: RoutesService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      points: this.formBuilder.array([]),
      chosenPoint: [BLANK_ROUTE.id],
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

  getPointsControls(): any {
    if (!this.validateForm) {
      return [];
    }
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
      nzContent: MapModalComponent,
      nzComponentParams: {
        points: this.getPointsControls().map((point) => point.value),
      }
    });
  }
}
