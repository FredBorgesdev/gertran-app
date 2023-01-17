import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseCustomerFilterComponent} from './base-customer-filter.component';

xdescribe('BaseCustomerFilterComponent', () => {
  let component: BaseCustomerFilterComponent;
  let fixture: ComponentFixture<BaseCustomerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseCustomerFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCustomerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
