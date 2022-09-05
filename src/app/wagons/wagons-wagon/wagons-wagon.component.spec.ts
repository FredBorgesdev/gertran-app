import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagonsWagonComponent } from './wagons-wagon.component';

describe('WagonsWagonComponent', () => {
  let component: WagonsWagonComponent;
  let fixture: ComponentFixture<WagonsWagonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagonsWagonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonsWagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
