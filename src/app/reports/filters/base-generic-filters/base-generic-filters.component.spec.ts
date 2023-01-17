import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseGenericFiltersComponent} from './base-generic-filters.component';

xdescribe('BaseGenericFiltersComponent', () => {
  let component: BaseGenericFiltersComponent;
  let fixture: ComponentFixture<BaseGenericFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseGenericFiltersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGenericFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
