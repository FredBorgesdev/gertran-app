import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTower1 } from './tc1.component';

describe('ControlTower1', () => {
  let component: ControlTower1;
  let fixture: ComponentFixture<ControlTower1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTower1 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTower1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});