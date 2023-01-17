import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackersTableComponent} from './trackers-table.component';

xdescribe('TrackersTableComponent', () => {
  let component: TrackersTableComponent;
  let fixture: ComponentFixture<TrackersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackersTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
