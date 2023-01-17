import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TravelEndComponent} from './travel-end.component';

xdescribe('TravelEndComponent', () => {
  let component: TravelEndComponent;
  let fixture: ComponentFixture<TravelEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelEndComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
