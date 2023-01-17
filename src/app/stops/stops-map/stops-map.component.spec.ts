import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StopsMapComponent} from './stops-map.component';

xdescribe('StopsMapComponent', () => {
  let component: StopsMapComponent;
  let fixture: ComponentFixture<StopsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopsMapComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
