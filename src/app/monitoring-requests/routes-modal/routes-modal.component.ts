import { Component, OnInit } from '@angular/core';
import {Route, RoutesService} from '../../routes/routes.service';
import {Customer, CustomersService} from '../../customers/customers.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';

export const BLANK_ROUTE = {
  id: 'blank',
  name: 'Rota em branco',
  description: '-',
  points: []
};

@Component({
  selector: 'app-routes-modal',
  templateUrl: './routes-modal.component.html',
  styleUrls: ['./routes-modal.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class RoutesModalComponent implements OnInit {
  routes: Route[] = [];
  customers: Customer[] = [];

  customer = null;
  routeId = BLANK_ROUTE.id;

  listOfCurrentPageData: readonly Route[] = [];
  isLoadingMoreData: boolean;

  constructor(
    private routesService: RoutesService,
    public selectableCustomerService: SelectableCustomerServiceService,
  ) { }

  ngOnInit(): void {
    this.routesService.getAll({ limit: 999 }).subscribe((response) => {
      this.routes = [BLANK_ROUTE as any, ...response.results];
    });
    this.selectableCustomerService.init();
  }

  onCurrentPageDataChange($event: readonly Route[]): void {
    this.listOfCurrentPageData = $event;
  }

  onItemChecked(id: string, checked: boolean): void {
    if (checked) {
      this.routeId = id;
    } else {
      this.routeId = BLANK_ROUTE.id;
    }
  }
}
