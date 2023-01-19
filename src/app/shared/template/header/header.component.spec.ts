import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {ThemeConstantService} from '../../services/theme-constant.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: any;
  let customerService: jasmine.SpyObj<CustomersService>;
  let selectableCustomerService: any;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const setup = () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    authService = jasmine.createSpyObj(['user', 'customerId', 'removeCustomer', 'setCustomer']);
    authService.customerId = null;
    authService.user = {
      id: '1234',
      customer: [],
      isGertranStaff: false,
    };

    customerService = jasmine.createSpyObj(['get']);

    selectableCustomerService = jasmine.createSpyObj(['init']);

    activatedRoute = jasmine.createSpyObj(['snapshot']);
    activatedRoute.snapshot = {queryParams: {}} as any;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        {provide: AuthenticationService, useValue: authService},
        {provide: CustomersService, useValue: customerService},
        {provide: SelectableCustomerServiceService, useValue: selectableCustomerService},
        {provide: ActivatedRoute, useValue: activatedRoute},
        ThemeConstantService,
      ],
    }).compileComponents();
  });

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  describe('when the user has no customer', () => {
    it('should not show the customer selector', () => {
      setup();
      const compiled = fixture.nativeElement;

      expect(component.showSelect).toBeFalse();
      expect(compiled.querySelector('[data-testid="customer-select"]')).toBeNull();
    });
  });

  describe('when the user has one customer', () => {
    it('should not show the customer selector', () => {
      authService.user.customer = [{id: '1', name: 'customer1'}];
      setup();
      const compiled = fixture.nativeElement;

      expect(component.showSelect).toBeFalse();
      expect(compiled.querySelector('[data-testid="customer-select"]')).toBeNull();
    });
  });

  describe('when the user has more than one customer', () => {
    it('should show the customer selector', () => {
      authService.user.customer = [{id: '1', name: 'customer1'}, {id: '2', name: 'customer2'}];
      setup();
      const compiled = fixture.nativeElement;

      expect(component.showSelect).toBeTrue();
      expect(compiled.querySelector('[data-testid="customer-select"]')).not.toBeNull();
    });
  });

  describe('when the user is a Gertran staff', () => {
    it('should show the customer selector', () => {
      authService.user.isGertranStaff = true;
      setup();
      const compiled = fixture.nativeElement;

      expect(component.showSelect).toBeTrue();
      expect(compiled.querySelector('[data-testid="customer-select"]')).not.toBeNull();
    });
  });

  describe('when the customer query param is passed', () => {
    it('should set the customer', () => {
      authService.user.customer = [{id: '1', name: 'customer1'}, {id: '2', name: 'customer2'}];
      const customer = {id: '1', name: 'customer1'} as unknown as Customer;
      activatedRoute.snapshot = {queryParams: {customer: customer.id}} as any;
      customerService.get.and.returnValue(new BehaviorSubject(customer));

      setup();
      const compiled = fixture.nativeElement;

      expect(authService.setCustomer).toHaveBeenCalledWith(customer.id);
      expect(component.showSelect).toBeTrue();
      expect(compiled.querySelector('[data-testid="customer-select"]')).not.toBeNull();
    });
  });
});
