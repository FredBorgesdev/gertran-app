import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOperationsTabComponent } from './shared-operations-tab.component';

describe('SharedOperationsTabComponent', () => {
  let component: SharedOperationsTabComponent;
  let fixture: ComponentFixture<SharedOperationsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedOperationsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedOperationsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
