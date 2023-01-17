import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationalAuditMessagesComponent} from './operational-audit-messages.component';

xdescribe('OperationalAuditMessagesComponent', () => {
  let component: OperationalAuditMessagesComponent;
  let fixture: ComponentFixture<OperationalAuditMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationalAuditMessagesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalAuditMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
