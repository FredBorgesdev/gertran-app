import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationalAuditCommandsComponent} from './operational-audit-commands.component';

xdescribe('OperationalAuditCommandsComponent', () => {
  let component: OperationalAuditCommandsComponent;
  let fixture: ComponentFixture<OperationalAuditCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationalAuditCommandsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalAuditCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
