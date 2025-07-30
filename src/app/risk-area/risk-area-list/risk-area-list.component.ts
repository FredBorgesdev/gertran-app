import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RiskAreaService, RiskArea } from '../risk-area.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-risk-area-list',
  templateUrl: './risk-area-list.component.html',
  styleUrls: ['./risk-area-list.component.css']
})
export class RiskAreaListComponent extends BaseCrudListComponent<RiskArea> {

  columns = [
    { title: 'Nome' },
    { title: 'Latitude' },
    { title: 'Longitude' },
    { title: 'Raio (m)' },
    { title: 'Tipo de Ponto' },
    { title: 'AÇÕES' },
  ];

  searchInput = '';

  constructor(
    service: RiskAreaService,
    router: Router,
    modal: NzModalService,
    message: NzMessageService,
    public authService: AuthenticationService,
    
  ) {
    super(
      'risk-area',
      router,
      service,
      message,
      modal,
    );
  }





  override additionalParams(): any[] {
    const params: any = {};
    params.customer = this.authService.customerId
    return [params];
  }
}
