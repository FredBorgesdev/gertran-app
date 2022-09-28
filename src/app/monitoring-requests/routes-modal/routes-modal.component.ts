import { Component, OnInit } from '@angular/core';
import {Route, RoutesService} from '../../routes/routes.service';

export const BLANK_ROUTE = {
  id: 'blank',
  name: 'Rota em branco',
  description: '-',
  points: []
};

@Component({
  selector: 'app-routes-modal',
  templateUrl: './routes-modal.component.html',
  styleUrls: ['./routes-modal.component.css']
})
export class RoutesModalComponent implements OnInit {
  routes: Route[] = [];

  checkedId = BLANK_ROUTE.id;
  listOfCurrentPageData: readonly Route[] = [];

  constructor(
    private routesService: RoutesService,
  ) { }

  ngOnInit(): void {
    this.routesService.getAll({ limit: 999 }).subscribe((response) => {
      this.routes = [BLANK_ROUTE as any, ...response.results];
    });
  }

  onCurrentPageDataChange($event: readonly Route[]): void {
    this.listOfCurrentPageData = $event;
  }

  onItemChecked(id: string, checked: boolean): void {
    if (checked) {
      this.checkedId = id;
    } else {
      this.checkedId = BLANK_ROUTE.id;
    }
  }
}
