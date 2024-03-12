import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTower3 } from './tc3.component';

describe('ControlTower3', () => {
  let component: ControlTower3;
  let fixture: ComponentFixture<ControlTower3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTower3 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTower3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});