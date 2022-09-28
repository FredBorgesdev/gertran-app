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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private routesService: RoutesService,
    private i18n: NzI18nService,
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
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      points: this.formBuilder.array([]),
      address: [null, [Validators.required]],
    });

    const { routeId } = this.activatedRoute.snapshot.queryParams || {};
    if (!routeId || routeId === BLANK_ROUTE) {
      return;
    }

    this.routesService.get(routeId).subscribe(async (route) => {
      for (const point of route.points) {
        const formGroup = this.addPoint();
        const previousPoint = this.getPointsControls()[this.getPointsControls().length - 2];

        let time = null;
        if (previousPoint) {
          const eta = await this.calculateETA(
            { lat: previousPoint.value.latitude, lng: previousPoint.value.longitude },
            { lat: point.latitude, lng: point.longitude },
          );
          time = addSeconds(previousPoint.value.time, eta);
        }

        formGroup.patchValue({
          pointId: point.id,
          address: point.point,
          time,
        });
      }
    });
  }

  getPointsControls(): any {
    return (this.validateForm.get('points') as FormArray).controls;
  }

  addPoint(): FormGroup {
    (this.validateForm.get('points') as FormArray).push(
      new FormGroup({
        pointId: new FormControl(null),
        address: new FormControl(null, [Validators.required]),
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
  }

  list(): void {
    this.router.navigate(['/monitoring-requests/monitoring-requests-list']);
  }

  calculateETA(origin: LatLng, destination: LatLng): Promise<number> {
    return new Promise((resolve, reject) => {
      const directions = new MapboxDirections({
        accessToken: 'pk.eyJ1Ijoidml0b3JsZGZyZWl0YXMiLCJhIjoiY2w4amppY25kMDQ4ODNucWc5Ynh6MTc4biJ9.9T9N2GtMEAwgo88NSwHayA',
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
      directions.on('route', (e) => {
        console.log(e)
      });
    });
  }
}
