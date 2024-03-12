import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTower2 } from './tc2.component';

describe('ControlTower2', () => {
  let component: ControlTower2;
  let fixture: ComponentFixture<ControlTower2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTower2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTower2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
