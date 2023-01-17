import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AutomationsFormComponent} from './automations-form.component';

xdescribe('AutomationsFormComponent', () => {
  let component: AutomationsFormComponent;
  let fixture: ComponentFixture<AutomationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
