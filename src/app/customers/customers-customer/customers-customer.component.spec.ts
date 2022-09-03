import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCustomerComponent } from './customers-tab.component';

describe('CustomersCustomerComponent', () => {
  let component: CustomersCustomerComponent;
  let fixture: ComponentFixture<CustomersCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
