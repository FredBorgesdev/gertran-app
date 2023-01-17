import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArmedGuardTabComponent} from './armed-guard-tab.component';

xdescribe('ArmedGuardTabComponent', () => {
  let component: ArmedGuardTabComponent;
  let fixture: ComponentFixture<ArmedGuardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArmedGuardTabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmedGuardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
