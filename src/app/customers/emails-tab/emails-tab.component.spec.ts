import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmailsTabComponent} from './emails-tab.component';

xdescribe('EmailsTabComponent', () => {
  let component: EmailsTabComponent;
  let fixture: ComponentFixture<EmailsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailsTabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
