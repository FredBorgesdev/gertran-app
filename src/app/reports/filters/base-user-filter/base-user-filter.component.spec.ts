import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseUserFilterComponent} from './base-user-filter.component';

xdescribe('BaseCustomerFilterComponent', () => {
  let component: BaseUserFilterComponent;
  let fixture: ComponentFixture<BaseUserFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseUserFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseUserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
