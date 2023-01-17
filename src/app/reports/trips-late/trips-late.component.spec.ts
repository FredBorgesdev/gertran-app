import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TripsLateComponent} from './trips-late.component';

xdescribe('TripsLateComponent', () => {
  let component: TripsLateComponent;
  let fixture: ComponentFixture<TripsLateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsLateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsLateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
