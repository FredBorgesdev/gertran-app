import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TerminalsFormComponent} from './terminals-form.component';

xdescribe('TerminalsFormComponent', () => {
  let component: TerminalsFormComponent;
  let fixture: ComponentFixture<TerminalsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
