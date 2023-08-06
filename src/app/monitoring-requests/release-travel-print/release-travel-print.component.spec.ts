import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTravelPrintComponent } from './release-travel-print.component';

describe('ReleaseTravelPrintComponent', () => {
  let component: ReleaseTravelPrintComponent;
  let fixture: ComponentFixture<ReleaseTravelPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseTravelPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTravelPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
