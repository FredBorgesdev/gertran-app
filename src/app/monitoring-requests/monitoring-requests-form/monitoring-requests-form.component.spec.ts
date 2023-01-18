import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MonitoringRequests, MonitoringRequestsService} from '../monitoring-requests.service';
import {RouterTestingModule} from '@angular/router/testing';
import {DEFAULT_CRUD_FORM_PROVIDERS} from '../../base-crud/base-crud-form/base-crud-form.component.spec';
import {MonitoringRequestsFormComponent} from './monitoring-requests-form.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {FormBuilder} from '@angular/forms';
import {NzI18nService} from 'ng-zorro-antd/i18n';
import {StopsService} from '../../stops/stops.service';
import {DriversService} from '../../drivers/drivers.service';
import {TrucksService} from '../../trucks/trucks.service';
import {WagonsService} from '../../wagons/wagons.service';
import {OperationsService} from '../../operations/operations.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import EmptyGetAllResponseFactory from '../../shared/factories/empty-get-all-response';

describe('MonitoringRequestsFormComponent', () => {
  let component: MonitoringRequestsFormComponent;
  let fixture: ComponentFixture<MonitoringRequestsFormComponent>;
  let authService: any;
  let monitoringRequestsService: jasmine.SpyObj<MonitoringRequestsService>;
  let stopsService: jasmine.SpyObj<StopsService>;
  let driversService: jasmine.SpyObj<DriversService>;
  let trucksService: jasmine.SpyObj<TrucksService>;
  let wagonsService: jasmine.SpyObj<WagonsService>;
  let operationService: jasmine.SpyObj<OperationsService>;
  let activatedRoute: any;
  let selectableCustomerService: any;

  const setup = () => {
    fixture = TestBed.createComponent(MonitoringRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    authService = jasmine.createSpyObj(['user', 'customerId']);
    authService.customerId = null;

    monitoringRequestsService = jasmine.createSpyObj(['get', 'create', 'update', 'getSurveyConductors']);
    monitoringRequestsService.getSurveyConductors.and.returnValue(new BehaviorSubject([]));

    stopsService = jasmine.createSpyObj(['getAll']);
    stopsService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());

    driversService = jasmine.createSpyObj(['getAll']);
    driversService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());

    trucksService = jasmine.createSpyObj(['getAll']);
    trucksService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());
    wagonsService = jasmine.createSpyObj(['getAll']);
    wagonsService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());

    operationService = jasmine.createSpyObj(['getAll']);
    operationService.getAll.and.returnValue(EmptyGetAllResponseFactory.create());

    activatedRoute = jasmine.createSpyObj(['snapshot']);
    activatedRoute.snapshot = {params: {}};

    selectableCustomerService = jasmine.createSpyObj(['init']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MonitoringRequestsFormComponent],
      providers: [
        {provide: AuthenticationService, useValue: authService},
        {provide: MonitoringRequestsService, useValue: monitoringRequestsService},
        {provide: StopsService, useValue: stopsService},
        {provide: DriversService, useValue: driversService},
        {provide: TrucksService, useValue: trucksService},
        {provide: WagonsService, useValue: wagonsService},
        {provide: OperationsService, useValue: operationService},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: SelectableCustomerServiceService, useValue: selectableCustomerService},
        ...DEFAULT_CRUD_FORM_PROVIDERS,
        FormBuilder,
        NzI18nService,
      ],
    });
  });

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  describe('when the customer has no shippers', () => {
    beforeEach(() => {
      setup();
    });

    it('should not render the shipper select', () => {
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('[data-testid="shipper-select"]')).toBeNull();
    });
  });

  describe('when the customer has shippers', () => {
    beforeEach(() => {
      const id = '123';

      activatedRoute.snapshot = {params: {id}};
      monitoringRequestsService.get.withArgs(id).and.returnValue(new BehaviorSubject({
        id,
        customer: {
          shippers: [
            {id: '1', tradingName: 'Shipper 1'}
          ]
        }
      } as MonitoringRequests));

      setup();
    });

    it('should render the shipper select if the customer has shippers', () => {
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('[data-testid="shipper-select"]')).toBeTruthy();
    });
  });
});
