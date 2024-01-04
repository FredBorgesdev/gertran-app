import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonitoringProtocolListComponent} from './protocol-list.component';

xdescribe('MonitoringProtocolListComponent', () => {
  let component: MonitoringProtocolListComponent;
  let fixture: ComponentFixture<MonitoringProtocolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoringProtocolListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringProtocolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
