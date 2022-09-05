import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrucksTrackersComponent } from './trucks-trackers.component';

describe('TrucksTrackersComponent', () => {
  let component: TrucksTrackersComponent;
  let fixture: ComponentFixture<TrucksTrackersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrucksTrackersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrucksTrackersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
