import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaitsComponent } from './baits.component';

describe('BaitsComponent', () => {
  let component: BaitsComponent;
  let fixture: ComponentFixture<BaitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
