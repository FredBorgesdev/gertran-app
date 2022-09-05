import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrucksTrackersFormComponent } from './trucks-trackers-form.component';

describe('TrucksTrackersFormComponent', () => {
  let component: TrucksTrackersFormComponent;
  let fixture: ComponentFixture<TrucksTrackersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrucksTrackersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrucksTrackersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
