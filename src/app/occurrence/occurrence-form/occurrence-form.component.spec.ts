import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OccurenceFormComponent} from './occurrence-form.component';

xdescribe('OccurenceFormComponent', () => {
  let component: OccurenceFormComponent;
  let fixture: ComponentFixture<OccurenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OccurenceFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
