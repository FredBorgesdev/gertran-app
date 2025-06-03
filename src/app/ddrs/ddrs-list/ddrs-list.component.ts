import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {DdrsService, Ddr} from '../ddrs.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-ddrs-list',
  templateUrl: './ddrs-list.component.html',
  styleUrls: ['./ddrs-list.component.css']
})
export class DdrsListComponent extends BaseCrudListComponent<Ddr> {

  insuranceCompaniesColumns = [
    // {title: 'ID'},
    {
      title: 'NOME',
      // compare: (
      //   a: Ddr,
      //   b: Ddr
      // ) => a.trading_name.localeCompare(b.trading_name),
    },
    // {title: 'Telefone'},
    // {
    //   title: 'Email',
    //   // compare: (
    //   //   a: Ddr,
    //   //   b: Ddr
    //   // ) => a.broker.localeCompare(b.broker),
    // },
    {title: 'CNPJ'},
    {title: 'INICIO'},
    {title: 'FIM'},
    {title: 'CORRETOR'},
    {title: 'AÇÕES'},
  ];

  searchInput = '';


  constructor(
    ddrsService: DdrsService,
    router: Router,
    modal: NzModalService,
    message: NzMessageService,
    
  ) {
    super(
      'ddrs',
      router,
      ddrsService,
      message,
      modal,
    );
  }
}
