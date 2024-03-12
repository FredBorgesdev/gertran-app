import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTower4 } from './client.component';

describe('ControlTower4', () => {
  let component: ControlTower4;
  let fixture: ComponentFixture<ControlTower4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTower4 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTower4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});