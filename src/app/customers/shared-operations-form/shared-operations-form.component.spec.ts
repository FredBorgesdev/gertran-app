import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOperationsFormComponent } from './shared-operations-form.component';

describe('SharedOperationsFormComponent', () => {
  let component: SharedOperationsFormComponent;
  let fixture: ComponentFixture<SharedOperationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedOperationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
