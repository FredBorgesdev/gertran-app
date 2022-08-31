import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrucksFormComponent } from './trucks-form.component';

describe('TrucksFormComponent', () => {
  let component: TrucksFormComponent;
  let fixture: ComponentFixture<TrucksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrucksFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrucksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
