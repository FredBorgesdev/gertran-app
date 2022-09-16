import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesList } from './mocked-data';
import {Stop} from '../../stops/stops.service';

export interface Route {
  id: number | null;
  name: string;
  code?: string;
  description?: string;
  lead?: number;
  stops: {
    stop: Stop
    stopTypeId: number
  }[];
}

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  isLoading = false;
  routesList = [];
  searchInput = '';

  routesColumns = [
    {
      title: 'ID',
      compare: (
        a: Route,
        b: Route
      ) => a.id - b.id
    },
    {
      title: 'Nome',
      compare: (
        a: Route,
        b: Route
      ) => a.name.localeCompare(b.name)
    },
    {
      title: 'Code',
      compare: (
        a: Route,
        b: Route
      ) => a.code.localeCompare(b.code)
    },
    { title: 'Descrição' },
    { title: 'Lead' },
    { title: 'Ações' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.routesList = routesList;
      this.isLoading = false;
    }, 333);
  }

  create() {
    this.router.navigate(['routes', 'route-create']);
  }

  edit(item: Route) {
    this.router.navigate(['routes', 'route-edit', item.id]);
  }
}
