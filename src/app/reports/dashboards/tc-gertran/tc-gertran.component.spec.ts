import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTowerGertran } from './tc-gertran.component';

describe('ControlTowerGertran', () => {
  let component: ControlTowerGertran;
  let fixture: ComponentFixture<ControlTowerGertran>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTowerGertran ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTowerGertran);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});