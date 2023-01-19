import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SideNavComponent} from './side-nav.component';
import {ThemeConstantService} from '../../services/theme-constant.service';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {ROUTES} from './side-nav-routes.config';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let authService: any;
  let user: any;

  const setup = () => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    user = jasmine.createSpyObj(['isGertranStaff', 'hasPermission']);
    user.isGertranStaff = false;
    user.hasPermission.and.returnValue(false);

    authService = jasmine.createSpyObj(['user', 'customerId']);
    authService.customerId = null;
    authService.user = user;

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [SideNavComponent],
      providers: [
        {provide: AuthenticationService, useValue: authService},
        ThemeConstantService,
      ]
    })
      .compileComponents();
  });

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  describe('when the user is not a Gertran staff', () => {
    describe('when the user has no permissions', () => {
      it('should not show all routes', () => {
        setup();
        expect(component.menuItems.length).toEqual(6);
      });
    });

    describe('when the user has the default permissions', () => {
      beforeEach(() => {
        user.hasPermission.and.returnValue(true);
      });

      it('should show all routes', () => {
        const expectedRoutes = ROUTES.filter(route => !route.gertranStaffOnly);
        setup();
        expect(component.menuItems.length).toEqual(expectedRoutes.length);
      });
    });
  });

  describe('when the user is a Gertran staff', () => {
    beforeEach(() => {
      user.isGertranStaff = true;
    });

    it('should show all routes', () => {
      setup();
      expect(component.menuItems.length).toEqual(ROUTES.length);
    });
  });
});
