import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrucksTruckComponent } from './trucks-truck.component';

describe('TrucksTruckComponent', () => {
  let component: TrucksTruckComponent;
  let fixture: ComponentFixture<TrucksTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrucksTruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrucksTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
