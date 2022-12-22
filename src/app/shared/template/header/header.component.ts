import {Component, OnInit} from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import {ActivatedRoute} from '@angular/router';
import {Customer} from '../../../customers/customers.service';
import {AuthenticationService} from '../../../authentication/authentication.service';
import User from '../../../users/user';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SelectableCustomerServiceService]
})

export class HeaderComponent implements OnInit {

  constructor(
    private themeService: ThemeConstantService,
    private authService: AuthenticationService,
    public selectableCustomerService: SelectableCustomerServiceService,
  ) {}

  searchVisible = false;
  quickViewVisible = false;
  isFolded: boolean;
  isExpand: boolean;
  selectedCustomer: string;
  user: User;

  ngOnInit(): void {
    this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
    this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    this.setCustomers();
    if (this.user.isGertranStaff) {
      this.selectableCustomerService.init();
    }
  }

  toggleFold(): void {
    this.isFolded = !this.isFolded;
    this.themeService.toggleFold(this.isFolded);
  }

  toggleExpand(): void {
    this.isFolded = false;
    this.isExpand = !this.isExpand;
    this.themeService.toggleExpand(this.isExpand);
    this.themeService.toggleFold(this.isFolded);
  }

  searchToggle(): void {
    this.searchVisible = !this.searchVisible;
  }

  quickViewToggle(): void {
    this.quickViewVisible = !this.quickViewVisible;
  }

  onCustomerChange(value: string): void {
    this.authService.setCustomer(value);
  }

  private setCustomers(): void {
    this.user = this.authService.user;

    if (this.user.customer.length > 0) {
      this.selectedCustomer = this.user.customer[0].id;
      this.authService.setCustomer(this.selectedCustomer);
    } else {
      this.selectedCustomer = '';
      this.authService.removeCustomer();
    }
  }

  get showSelect(): boolean {
    return this.user.customer.length > 1 || this.user.isGertranStaff;
  }

  get customers(): Customer[] {
    if (!this.user.isGertranStaff) {
      return this.user.customer;
    }

    return this.selectableCustomerService.customers;
  }
}
