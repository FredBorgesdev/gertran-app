import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackersTabComponent} from './trackers-tab.component';

describe('TrackersTabComponent', () => {
  let component: TrackersTabComponent;
  let fixture: ComponentFixture<TrackersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackersTabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
