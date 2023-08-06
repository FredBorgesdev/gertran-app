import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistPrintComponent } from './checklist-print.component';

describe('ChecklistPrintComponent', () => {
  let component: ChecklistPrintComponent;
  let fixture: ComponentFixture<ChecklistPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
