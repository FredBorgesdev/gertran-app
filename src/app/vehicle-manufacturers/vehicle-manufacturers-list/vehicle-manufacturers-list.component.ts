import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { VehicleManufacturersService, VehicleManufacturers } from '../vehicle-manufacturers.service';

@Component({
  selector: 'app-vehicle-manufacturers-list',
  templateUrl: './vehicle-manufacturers-list.component.html',
  styleUrls: ['./vehicle-manufacturers-list.component.css'],
})
export class VehicleManufacturersListComponent implements OnInit {
  isLoading = false
  vehicleManufacturersList: GetAllResponse<VehicleManufacturers> = null

  vehicleManufacturersColumns = [
    { title: 'Nome' },
    { title: 'Faz caminhões?' },
    { title: 'Faz carretas?' },
    { title: 'Ações' },
  ]

  constructor(
    private router: Router,
    private service: VehicleManufacturersService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadVehicleManufacturers()
  }

  loadVehicleManufacturers(url?: string) {
    this.isLoading = true
    this.service.getAll({ url }).subscribe((data) => {
      this.vehicleManufacturersList = data
      this.isLoading = false
    })
  }

  create(){
    this.router.navigate(['/vehicle-manufacturers', 'vehicle-manufacturers-create'])
  }

  edit(item: VehicleManufacturers){
    this.router.navigate(['/vehicle-manufacturers', 'vehicle-manufacturers-edit', item.id])
  }

  delete(item: VehicleManufacturers) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.handleDelete(item.id),
    })
  }

  handleDelete(id: string) {
    this.isLoading = true
    this.service.delete(id).subscribe(() => {
      this.loadVehicleManufacturers()
      this.message.success('Construtoras excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir Construtoras')
      this.isLoading = false
    })
  }

  get page() {
    return getCurrentPage(this.vehicleManufacturersList)
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadVehicleManufacturers(this.vehicleManufacturersList.previous)
    } else if (params.pageIndex > this.page) {
      this.loadVehicleManufacturers(this.vehicleManufacturersList.next)
    }
  }
}
