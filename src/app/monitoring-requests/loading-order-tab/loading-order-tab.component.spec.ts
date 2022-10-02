import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOrderTabComponent } from './loading-order-tab.component';

describe('LoadingOrderTabComponent', () => {
  let component: LoadingOrderTabComponent;
  let fixture: ComponentFixture<LoadingOrderTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingOrderTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOrderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
