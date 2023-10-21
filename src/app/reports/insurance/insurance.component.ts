import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";
import {InsuranceCompaniesService} from "../../insurance-companies/insurance-companies.service";
import {Customer} from "../../customers/customers.service";

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  customers: Customer[] = [];
  customerId = null;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private insuranceCompaniesService: InsuranceCompaniesService,
  ) {
  }

  ngOnInit(): void {
    this.insuranceCompaniesService.getCustomers()
      .subscribe(response => {
        this.customers = response.results;
      });
  }

  goTo(link: string, qp?: any): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([link], {
        queryParams: {
          ...qp,
          customerId: this.customerId
        }
      })
    );

    window.open(url, '_blank');
  }
}
