import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaitsTabComponent } from './baits-tab.component';

describe('BaitsTabComponent', () => {
  let component: BaitsTabComponent;
  let fixture: ComponentFixture<BaitsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaitsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaitsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
