import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrovehicleComponent } from './macrovehicle.component';

describe('MacrovehicleComponent', () => {
  let component: MacrovehicleComponent;
  let fixture: ComponentFixture<MacrovehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacrovehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacrovehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
