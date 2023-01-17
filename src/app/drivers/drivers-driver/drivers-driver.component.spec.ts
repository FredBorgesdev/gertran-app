import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DriversDriverComponent} from './drivers-driver.component';

xdescribe('DriversDriverComponent', () => {
  let component: DriversDriverComponent;
  let fixture: ComponentFixture<DriversDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversDriverComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
