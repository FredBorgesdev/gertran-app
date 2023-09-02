import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tv1Component } from './tv1.component';

describe('Tv1Component', () => {
  let component: Tv1Component;
  let fixture: ComponentFixture<Tv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tv1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
