import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMarkersModalComponent } from './map-markers-modal.component';

describe('MapMarkersModalComponent', () => {
  let component: MapMarkersModalComponent;
  let fixture: ComponentFixture<MapMarkersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapMarkersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMarkersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
