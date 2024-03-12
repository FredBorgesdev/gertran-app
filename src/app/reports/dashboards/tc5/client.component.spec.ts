import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTower5 } from './client.component';

describe('ControlTower5', () => {
  let component: ControlTower5;
  let fixture: ComponentFixture<ControlTower5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTower5 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTower5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});