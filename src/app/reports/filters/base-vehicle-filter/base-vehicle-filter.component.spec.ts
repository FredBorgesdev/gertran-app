import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseVehicleFilterComponent} from './base-vehicle-filter.component';

xdescribe('BaseVehicleFilterComponent', () => {
  let component: BaseVehicleFilterComponent;
  let fixture: ComponentFixture<BaseVehicleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseVehicleFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseVehicleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
