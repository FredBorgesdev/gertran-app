import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StopsStopComponent} from './stops-stop.component';

xdescribe('StopsStopComponent', () => {
  let component: StopsStopComponent;
  let fixture: ComponentFixture<StopsStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopsStopComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
