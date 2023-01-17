import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseCrudFormComponent} from './base-crud-form.component';

xdescribe('BaseCrudFormComponent', () => {
  let component: BaseCrudFormComponent<any>;
  let fixture: ComponentFixture<BaseCrudFormComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseCrudFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCrudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
