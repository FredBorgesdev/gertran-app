import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { VehicleModelTypesService, VehicleModelTypes } from '../vehicle-model-types.service';

@Component({
  selector: 'app-vehicle-model-types-list',
  templateUrl: './vehicle-model-types-list.component.html',
  styleUrls: ['./vehicle-model-types-list.component.css'],
})
export class VehicleModelTypesListComponent implements OnInit {
  isLoading = false
  vehicleModelTypesList: GetAllResponse<VehicleModelTypes> = null

  vehicleModelTypesColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ]

  constructor(
    private router: Router,
    private service: VehicleModelTypesService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadVehicleModelTypes()
  }

  loadVehicleModelTypes(url?: string) {
    this.isLoading = true
    this.service.getAll({ url }).subscribe((data) => {
      this.vehicleModelTypesList = data
      this.isLoading = false
    })
  }

  create(){
    this.router.navigate(['/vehicle-model-types', 'vehicle-model-types-create'])
  }

  edit(item: VehicleModelTypes){
    this.router.navigate(['/vehicle-model-types', 'vehicle-model-types-edit', item.id])
  }

  delete(item: VehicleModelTypes) {
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
      this.loadVehicleModelTypes()
      this.message.success('Tipos de Veiculos excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir Tipos de Veiculos')
      this.isLoading = false
    })
  }

  get page() {
    return getCurrentPage(this.vehicleModelTypesList)
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadVehicleModelTypes(this.vehicleModelTypesList.previous)
    } else if (params.pageIndex > this.page) {
      this.loadVehicleModelTypes(this.vehicleModelTypesList.next)
    }
  }
}
