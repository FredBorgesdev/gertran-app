import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TravelStartComponent} from './travel-start.component';

xdescribe('TravelStartComponent', () => {
  let component: TravelStartComponent;
  let fixture: ComponentFixture<TravelStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelStartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
