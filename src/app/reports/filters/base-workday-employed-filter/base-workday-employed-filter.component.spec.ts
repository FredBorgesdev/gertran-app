import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWorkdayEmployedFilterComponent } from './base-workday-employed-filter.component';

describe('BaseWorkdayEmployedFilterComponent', () => {
  let component: BaseWorkdayEmployedFilterComponent;
  let fixture: ComponentFixture<BaseWorkdayEmployedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWorkdayEmployedFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseWorkdayEmployedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
