import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMacroFilterComponent } from './base-macro-filter.component';

describe('BaseMacroFilterComponent', () => {
  let component: BaseMacroFilterComponent;
  let fixture: ComponentFixture<BaseMacroFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseMacroFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMacroFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
