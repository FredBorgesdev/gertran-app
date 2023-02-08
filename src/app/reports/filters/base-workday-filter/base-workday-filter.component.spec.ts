import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWorkdayFilterComponent } from './base-workday-filter.component';

describe('BaseWorkdayFilterComponent', () => {
  let component: BaseWorkdayFilterComponent;
  let fixture: ComponentFixture<BaseWorkdayFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWorkdayFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseWorkdayFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
