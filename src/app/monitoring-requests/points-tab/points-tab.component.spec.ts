import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PointsTabComponent} from './points-tab.component';

xdescribe('PointsTabComponent', () => {
  let component: PointsTabComponent;
  let fixture: ComponentFixture<PointsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointsTabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
