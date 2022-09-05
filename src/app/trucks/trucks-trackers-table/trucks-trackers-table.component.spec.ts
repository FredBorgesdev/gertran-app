import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrucksTrackersTableComponent } from './trucks-trackers-table.component';

describe('TrucksTrackersTableComponent', () => {
  let component: TrucksTrackersTableComponent;
  let fixture: ComponentFixture<TrucksTrackersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrucksTrackersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrucksTrackersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
