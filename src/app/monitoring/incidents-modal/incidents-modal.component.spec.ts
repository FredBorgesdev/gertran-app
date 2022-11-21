import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsModalComponent } from './incidents-modal.component';

describe('IncidentsModalComponent', () => {
  let component: IncidentsModalComponent;
  let fixture: ComponentFixture<IncidentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
