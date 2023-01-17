import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonitoringListComponent} from './monitoring-list.component';
import {AuthenticationService} from '../../authentication/authentication.service';

xdescribe('MonitoringListComponent', () => {
  let component: MonitoringListComponent;
  let fixture: ComponentFixture<MonitoringListComponent>;

  beforeEach(async () => {
    const mockAuthService = jasmine.createSpyObj(['user', 'customerId']);
    mockAuthService.user = {};
    mockAuthService.customerId = null;

    await TestBed.configureTestingModule({
      declarations: [MonitoringListComponent],
      providers: [
        {
          provide: AuthenticationService,
          useValue: mockAuthService,
        }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
