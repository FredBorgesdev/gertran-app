import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsOperationComponent } from './operations-operation.component';

describe('OperationsOperationComponent', () => {
  let component: OperationsOperationComponent;
  let fixture: ComponentFixture<OperationsOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
