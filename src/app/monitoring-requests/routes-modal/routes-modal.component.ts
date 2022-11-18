import { Component, OnInit } from '@angular/core';
import {Route, RoutesService} from '../../routes/routes.service';
import {Customer, CustomersService} from '../../customers/customers.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {GetAllResponse, getCurrentPage, replaceOffsetWithPage} from '../../shared/services/api.service';

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
  routes: GetAllResponse<Route>;
  customers: Customer[] = [];

  customer = null;
  routeId = BLANK_ROUTE.id;
  route: Route;

  listOfCurrentPageData: readonly Route[] = [];
  isLoadingMoreData: boolean;
  isLoading = false;

  searchDescriptionValue = '';
  descriptionFilterVisible = false;

  constructor(
    private routesService: RoutesService,
    public selectableCustomerService: SelectableCustomerServiceService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.loadRoutes();
    this.selectableCustomerService.init();
  }

  onCurrentPageDataChange($event: readonly Route[]): void {
    this.listOfCurrentPageData = $event;
  }

  onItemChecked(id: string, checked: boolean): void {
    if (checked) {
      this.routeId = id;
      this.route = this.routes.results.find(route => route.id === id);
    } else {
      this.routeId = BLANK_ROUTE.id;
      this.route = null;
    }
  }

  loadRoutes(url?: string): void {
    this.isLoading = true;
    this.routesService.getAll(
      { url },
      { hasPoints: true, description: this.searchDescriptionValue }
    ).subscribe(data => {
      this.routes = data;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }

  handleRoutesQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      const url = this.replaceOffsetWithPage(this.routes.previous, params.pageIndex);
      this.loadRoutes(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(this.routes.next, params.pageIndex);
      this.loadRoutes(url);
    }
  }

  replaceOffsetWithPage(url: string, page: number): string {
    return replaceOffsetWithPage(url, page);
  }

  get page(): number {
    return getCurrentPage(this.routes);
  }

  search(): void {
    this.loadRoutes();
    this.descriptionFilterVisible = false;
  }

  reset(): void {
    this.searchDescriptionValue = '';
    this.descriptionFilterVisible = false;
    this.loadRoutes();
  }
}
