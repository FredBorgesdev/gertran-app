import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Route, RoutesService} from '../routes.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent extends BaseCrudListComponent<Route> {
  searchInput = '';

  routesColumns = [
    { title: 'ID' },
    {
      title: 'Nome',
      compare: (
        a: Route,
        b: Route
      ) => a.name.localeCompare(b.name)
    },
    {
      title: 'Código',
      compare: (
        a: Route,
        b: Route
      ) => a.code.localeCompare(b.code)
    },
    { title: 'Descrição' },
    { title: 'Distância (km)' },
    { title: 'Vel. Média' },
    { title: 'Duração (minutos)' },
    { title: 'Ações' },
  ];

  constructor(
    router: Router,
    service: RoutesService,
    message: NzMessageService,
    modal: NzModalService,
    public authService: AuthenticationService
  ) {
    super(
      'routes',
      router,
      service,
      message,
      modal
    );
  }
}
