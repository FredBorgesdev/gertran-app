import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCrudFormComponent } from './base-crud-form.component';

describe('BaseCrudFormComponent', () => {
  let component: BaseCrudFormComponent;
  let fixture: ComponentFixture<BaseCrudFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCrudFormComponent ]
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
