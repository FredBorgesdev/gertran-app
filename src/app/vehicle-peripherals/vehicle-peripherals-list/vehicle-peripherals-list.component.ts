import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { VehiclePeripheralsService, VehiclePeripherals } from '../vehicle-peripherals.service';

@Component({
  selector: 'app-vehicle-peripherals-list',
  templateUrl: './vehicle-peripherals-list.component.html',
  styleUrls: ['./vehicle-peripherals-list.component.css'],
})
export class VehiclePeripheralsListComponent implements OnInit {
  isLoading = false
  vehiclePeripheralsList: GetAllResponse<VehiclePeripherals> = null

  vehiclePeripheralsColumns = [
    { title: 'Nome' },
    { title: 'Tipo de periferico' },
    { title: 'Ações' },
  ]

  constructor(
    private router: Router,
    private service: VehiclePeripheralsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadVehiclePeripherals()
  }

  loadVehiclePeripherals(url?: string) {
    this.isLoading = true
    this.service.getAll({ url }).subscribe((data) => {
      this.vehiclePeripheralsList = data
      this.isLoading = false
    })
  }

  create(){
    this.router.navigate(['/vehicle-peripherals', 'vehicle-peripherals-create'])
  }

  edit(item: VehiclePeripherals){
    this.router.navigate(['/vehicle-peripherals', 'vehicle-peripherals-edit', item.id])
  }

  delete(item: VehiclePeripherals) {
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
      this.loadVehiclePeripherals()
      this.message.success('Periferico excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir periferico')
      this.isLoading = false
    })
  }

  getPeripheralType(type: string) {
    if (type === 'actuator') return 'Atuador'
    if (type === 'sensor') return 'Sensor'
  }

  get page() {
    return getCurrentPage(this.vehiclePeripheralsList)
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.loadVehiclePeripherals(this.vehiclePeripheralsList.previous)
    } else if (params.pageIndex > this.page) {
      this.loadVehiclePeripherals(this.vehiclePeripheralsList.next)
    }
  }
}
