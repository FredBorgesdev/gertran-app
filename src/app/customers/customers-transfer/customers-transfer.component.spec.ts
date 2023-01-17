import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomersTransferComponent} from './customers-transfer.component';

xdescribe('CustomersTransferComponent', () => {
  let component: CustomersTransferComponent;
  let fixture: ComponentFixture<CustomersTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersTransferComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
