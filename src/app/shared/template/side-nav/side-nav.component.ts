import {Component, OnInit} from '@angular/core';
import {ROUTES} from './side-nav-routes.config';
import {ThemeConstantService} from '../../services/theme-constant.service';
import {SideNavInterface} from '../../interfaces/side-nav.type';
import {AuthenticationService} from '../../../authentication/authentication.service';
import User from '../../../users/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html'
})

export class SideNavComponent implements OnInit {

  public menuItems: any[];
  isFolded: boolean;
  isSideNavDark: boolean;
  isExpand: boolean;

  constructor(
    private themeService: ThemeConstantService,
    private authService: AuthenticationService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.menuItems = this.filteredItems(ROUTES);
    this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
    this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
  }

  closeMobileMenu(): void {
    this.isFolded = true;
    this.isExpand = false;
    this.themeService.toggleExpand(this.isExpand);
    this.themeService.toggleFold(this.isFolded);
  }

  get user(): User {
    return this.authService.user;
  }

  filteredItems(menu: SideNavInterface[]): SideNavInterface[] {
    return menu.filter(menuItem => {
      if (this.user.isGertranStaff) {
        return true;
      }
      const isFolder = menuItem.submenu.length > 0;
      const filteredFolder = this.filteredItems(menuItem.submenu);
      if (isFolder && filteredFolder.length === 0) {
        return false;
      }

      if (menuItem.permission && !this.user.hasPermission(menuItem.permission)) {
        return false;
      }
      if (menuItem.oneOfPermissions && !this.user.hasOneOfPermissions(menuItem.oneOfPermissions)) {
        return false;
      }
      if (menuItem.gertranStaffOnly) {
        return this.user.isGertranStaff;
      }
      return menuItem;
    });
  }
}
