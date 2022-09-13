import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCrudListComponent } from './base-crud-list.component';

describe('BaseCrudListComponent', () => {
  let component: BaseCrudListComponent;
  let fixture: ComponentFixture<BaseCrudListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCrudListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCrudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
