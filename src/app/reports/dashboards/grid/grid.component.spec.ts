import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {GridComponent} from './grid.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {CustomersService} from '../../customers/customers.service';
import {TerminalsService} from '../../terminals/terminals.service';
import {Position, PositionsService} from '../positions.service';
import {MonitoringRequestsService} from '../../monitoring-requests/monitoring-requests.service';
import {AlertsService} from '../alerts.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import EmptyGetAllResponseFactory from '../../shared/factories/empty-get-all-response';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {DEFAULT_CRUD_FORM_PROVIDERS} from '../../base-crud/base-crud-form/base-crud-form.component.spec';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder} from '@angular/forms';
import {NzContextMenuService} from 'ng-zorro-antd/dropdown';
import {By} from '@angular/platform-browser';

const mockPosition: Position = {
  id: 'f870c682-5e7b-4076-9fe5-8a672b564603',
  automations: [],
  customer: {
    id: 'c516b511-f00e-4bdb-aae3-2188a932465b',
    name: '1 Opção'
  },
  origin: null,
  destiny: null,
  events: [],
  ignition: true,
  monitoringRequest: null,
  speed: 12,
  temperature: -32,
  trackerSerialNumber: '836564',
  trackerModel: {
    id: '698d6567-ba5a-4d61-adfe-53c40f215b92',
    name: 'Sascar'
  },
  latitude: -19.924523333333333,
  longitude: -43.94243,
  street: null,
  vehicleStatus: null,
  pointReference: 'R dos Guajajaras - Belo Horizonte - MG',
  positionDate: '2022-12-13T02:18:21Z',
  trackerTechnologyName: 'sascar',
  travelProgress: 0.0,
  communicationChannel: 'gsm',
  vehiclePlate: 'MLT0029'
} as Position;

describe('MonitoringListComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let activatedRoute: any;
  let authService: any;
  let customerService: jasmine.SpyObj<CustomersService>;
  let terminalsService: jasmine.SpyObj<TerminalsService>;
  let positionsService: jasmine.SpyObj<PositionsService>;
  let monitoringRequestService: jasmine.SpyObj<MonitoringRequestsService>;
  let selectableCustomerService: jasmine.SpyObj<SelectableCustomerServiceService>;
  let alertsService: jasmine.SpyObj<AlertsService>;

  const setup = () => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    activatedRoute = jasmine.createSpyObj(['snapshot']);
    activatedRoute.snapshot = {queryParams: {}};

    authService = jasmine.createSpyObj(['user', 'customerId']);
    authService.user = {};
    authService.customerId = null;

    customerService = jasmine.createSpyObj(['getAll']);
    customerService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());

    terminalsService = jasmine.createSpyObj(['getAll']);
    terminalsService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());

    positionsService = jasmine.createSpyObj(['getAll', 'updatePointReferences']);
    positionsService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());
    positionsService.updatePointReferences.and.returnValue(new BehaviorSubject([]));

    monitoringRequestService = jasmine.createSpyObj(['getAll']);
    monitoringRequestService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());

    selectableCustomerService = jasmine.createSpyObj(['init']);
    selectableCustomerService.init.and.returnValue();

    alertsService = jasmine.createSpyObj(['getAlerts', 'getAlertsCount']);
    alertsService.getAlerts.and.returnValue(EmptyGetAllResponseFactory.create());
    alertsService.getAlertsCount.and.returnValue(new BehaviorSubject({
      info: 0,
      danger: 0,
      warning: 0,
    }));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GridComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: AuthenticationService, useValue: authService},
        {provide: CustomersService, useValue: customerService},
        {provide: TerminalsService, useValue: terminalsService},
        {provide: PositionsService, useValue: positionsService},
        {provide: MonitoringRequestsService, useValue: monitoringRequestService},
        {provide: SelectableCustomerServiceService, useValue: selectableCustomerService},
        {provide: AlertsService, useValue: alertsService},
        ...DEFAULT_CRUD_FORM_PROVIDERS,
        FormBuilder,
        NzContextMenuService,
      ],
    }).compileComponents();
  });

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  describe('when the user is gertran staff', () => {
    beforeEach(() => {
      activatedRoute.snapshot.queryParams = {customer: 'c516b511-f00e-4bdb-aae3-2188a932465b'};
      authService.user = {isGertranStaff: true};
      positionsService.getAll.and.returnValue(new BehaviorSubject({
        results: [mockPosition],
        count: 1,
        next: null,
        previous: null,
        limit: 1,
        offset: 0,
      }));

      fixture = TestBed.createComponent(GridComponent);
      component = fixture.componentInstance;
    });

    it('show alerts', fakeAsync(() => {
      fixture.detectChanges();
      tick(0);

      const alerts = fixture.debugElement.queryAll(By.css('[data-testid="alerts"]'));

      console.log(component.monitoringData.length);
      console.log(component.user);

      expect(alerts).toBeTruthy();

      component.stopMonitoring.next();
    }));

    it('show all columns', fakeAsync(() => {
      fixture.detectChanges();
      tick(0);
      fixture.detectChanges();

      const ths = fixture.debugElement.queryAll(By.css('th'));

      expect(ths.length).toEqual(component.monitoringColumns.length);

      component.stopMonitoring.next();
    }));
  });

  describe('when the user is not gertran staff', () => {
    beforeEach(() => {
      activatedRoute.snapshot.queryParams = {customer: 'c516b511-f00e-4bdb-aae3-2188a932465b'};
      authService.user = {isGertranStaff: false};
      positionsService.getAll.and.returnValue(new BehaviorSubject({
        results: [mockPosition],
        count: 1,
        next: null,
        previous: null,
        limit: 1,
        offset: 0,
      }));

      fixture = TestBed.createComponent(GridComponent);
      component = fixture.componentInstance;
    });

    it('not shows alerts', fakeAsync(() => {
      fixture.detectChanges();
      tick(0);

      const alerts = fixture.debugElement.query(By.css('[data-testid="alerts"]'));

      console.log(component.monitoringData.length);
      console.log(component.user);

      expect(alerts).toBeNull();

      component.stopMonitoring.next();
    }));

    it('show only permitted columns', fakeAsync(() => {
      fixture.detectChanges();
      tick(0);
      fixture.detectChanges();

      const ths = fixture.debugElement.queryAll(By.css('th'));

      const commonColumns = component.monitoringColumns.filter(column => !column.gertranStaffOnly);
      expect(ths.length).toEqual(commonColumns.length);

      component.stopMonitoring.next();
    }));
  });
});
