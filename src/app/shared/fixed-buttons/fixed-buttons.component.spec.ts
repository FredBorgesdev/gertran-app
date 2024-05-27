import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedButtonsComponent } from './fixed-buttons.component';

describe('FixedButtonsComponent', () => {
  let component: FixedButtonsComponent;
  let fixture: ComponentFixture<FixedButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
