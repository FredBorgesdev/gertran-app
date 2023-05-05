import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOperationsTableComponent } from './shared-operations-table.component';

describe('SharedOperationsTableComponent', () => {
  let component: SharedOperationsTableComponent;
  let fixture: ComponentFixture<SharedOperationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedOperationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedOperationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
