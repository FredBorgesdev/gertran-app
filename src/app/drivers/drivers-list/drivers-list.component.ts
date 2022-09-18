import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';

import { TableService } from '../../shared/services/table.service';
import { Driver, DriversService } from '../drivers.service';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: [ './drivers-list.component.css' ]
})
export class DriversListComponent implements OnInit {

  isLoading = false;
  displayData: GetAllResponse<Driver> = null;
  searchInput: string;

  driverColumn = [
    { title: 'ID' },
    {
      title: 'Nome',
      compare: (
        a: Driver,
        b: Driver
      ) => a.name.localeCompare(b.name)
    },
    { title: 'CPF' },
    { title: 'CNH' },
    { title: 'Categoria' },
    { title: 'Validade' },
    { title: 'Ações' }
  ];

  constructor(
    private router: Router,
    private tableService: TableService,
    private driversService: DriversService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(url?: string) {
    this.isLoading = true;
    this.driversService.getAll({ url }).subscribe(
      data => {
        this.displayData = data;
        this.isLoading = false;
      },
      () => {
        this.message.error('Falha ao carregar motoristas');
        this.isLoading = false;
      }
    );
  }


  search() {
    this.displayData.results = this.tableService.search(
      this.searchInput,
      this.displayData.results
    );
  }

  create() {
    this.router.navigate(['/drivers/driver-create']);
  }

  edit(item: Driver) {
    this.router.navigate(['/drivers/driver-edit', item.id]);
  }

  delete(item: Driver) {
    this.modal.confirm({
      nzTitle: 'Você tem certeza que deseja excluir este motorista?',
      nzOnOk: () => {
        this.driversService.delete(item.id).subscribe(
          () => {
            this.message.success('Motorista excluído com sucesso');
            this.loadDrivers();
          },
          () => this.message.error('Falha ao excluir motorista')
        );
      }
    });
  }

  get page() {
    return getCurrentPage(this.displayData);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadDrivers(this.displayData.previous);
    } else if (params.pageIndex > this.page) {
      this.loadDrivers(this.displayData.next);
    }
  }
}
