import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseClosingFilterComponent} from './base-closing-filter.component';

xdescribe('BaseCustomerFilterComponent', () => {
  let component: BaseClosingFilterComponent;
  let fixture: ComponentFixture<BaseClosingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseClosingFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseClosingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
