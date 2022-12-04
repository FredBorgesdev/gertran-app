import {Component, OnInit} from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import {ActivatedRoute} from '@angular/router';
import {Customer} from '../../../customers/customers.service';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(
    private themeService: ThemeConstantService,
    private authService: AuthenticationService,
  ) {}

  searchVisible = false;
  quickViewVisible = false;
  isFolded: boolean;
  isExpand: boolean;
  selectedCustomer: string;
  customers: Customer[] = [];

  ngOnInit(): void {
    this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
    this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    this.setCustomers();
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

  onCustomerChange($event: any): void {
    this.authService.setCustomer($event.target.value);
  }

  private setCustomers(): void {
    this.customers = this.authService.user.customer;
    if (this.customers.length > 0) {
      this.selectedCustomer = this.customers[0].id;
      this.authService.setCustomer(this.selectedCustomer);
    }
  }
}
