import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VehicleModelTypesService, VehicleModelTypes } from '../vehicle-model-types.service';

@Component({
  selector: 'app-vehicle-model-types-list',
  templateUrl: './vehicle-model-types-list.component.html',
  styleUrls: ['./vehicle-model-types-list.component.css'],
})
export class VehicleModelTypesListComponent implements OnInit {
  isLoading = false
  vehicleModelTypesList: VehicleModelTypes[] = []

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
    this.isLoading = true
    this.service.getAll().subscribe((data) => {
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
      this.vehicleModelTypesList = this.vehicleModelTypesList.filter(
        (item) => item.id !== id
      )
      this.message.success('Tipos de Veiculos excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir Tipos de Veiculos')
      this.isLoading = false
    })
  }
}
