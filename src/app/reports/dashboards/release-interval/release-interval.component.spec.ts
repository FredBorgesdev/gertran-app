import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReleaseIntervalComponent} from './release-interval.component';

describe('MonitoringRequestsComponent', () => {
  let component: ReleaseIntervalComponent;
  let fixture: ComponentFixture<ReleaseIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseIntervalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
