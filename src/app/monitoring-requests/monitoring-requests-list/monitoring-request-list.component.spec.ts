import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonitoringRequestsListComponent} from './monitoring-requests-list.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {DirectionsService} from '../../shared/services/directions.service';
import {MonitoringRequestsService} from '../monitoring-requests.service';
import {DEFAULT_CRUD_FORM_PROVIDERS} from '../../base-crud/base-crud-form/base-crud-form.component.spec';
import {RouterTestingModule} from '@angular/router/testing';

describe('MonitoringRequestsListComponent', () => {
  let component: MonitoringRequestsListComponent;
  let fixture: ComponentFixture<MonitoringRequestsListComponent>;
  let authService: any;
  let directionsService: jasmine.SpyObj<DirectionsService>;
  let monitoringRequestsService: jasmine.SpyObj<MonitoringRequestsService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj(['user', 'customerId']);
    authService.customerId = null;
    monitoringRequestsService = jasmine.createSpyObj(['getAll']);
    directionsService = jasmine.createSpyObj(['getCoordinates']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MonitoringRequestsListComponent],
      providers: [
        {provide: AuthenticationService, useValue: authService},
        {provide: DirectionsService, useValue: directionsService},
        {provide: MonitoringRequestsService, useValue: monitoringRequestsService},
        ...DEFAULT_CRUD_FORM_PROVIDERS,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the draft table if customerId is empty', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-testid="table-draft"]')).toBeNull();
  });

  it('should render the draft table if customerId is not empty', () => {
    authService.customerId = '1234';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="table-draft"]')).toBeTruthy();
  });
});
