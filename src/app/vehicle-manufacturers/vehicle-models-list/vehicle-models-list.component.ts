import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VehicleManufacturers } from '../vehicle-manufacturers.service';
import { VehicleModelsService, VehicleModels } from '../vehicle-models.service';

@Component({
  selector: 'app-vehicle-models-list',
  templateUrl: './vehicle-models-list.component.html',
  styleUrls: ['./vehicle-models-list.component.css'],
})
export class VehicleModelsListComponent implements OnInit {
  @Input() vehicleManufacturer: VehicleManufacturers = null

  isLoading = false
  isCreatingModel = false
  vehicleModelsList: VehicleModels[] = []
  vehicleModel: VehicleModels = null

  vehicleModelsColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ]

  constructor(
    private service: VehicleModelsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadVehicleModels()
  }

  loadVehicleModels() {
    this.isLoading = true
    this.service.getAll(this.vehicleManufacturer.id).subscribe((data) => {
      this.vehicleModelsList = data
      this.isLoading = false
    })
  }
  edit(item: VehicleModels) {
    this.vehicleModel = item
    this.isCreatingModel = true
  }

  delete(item: VehicleModels) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.handleDelete(item.id),
    })
  }

  handleCancel() {
    this.isCreatingModel = false
    this.vehicleModel = null
  }

  handleSuccess() {
    this.isCreatingModel = false
    this.loadVehicleModels()
  }

  handleDelete(id: string) {
    this.isLoading = true
    this.service.delete(id, this.vehicleManufacturer.id).subscribe(() => {
      this.vehicleModelsList = this.vehicleModelsList.filter(
        (item) => item.id !== id
      )
      this.message.success('Modelos excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir Modelos')
      this.isLoading = false
    })
  }
}
