import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { Group } from '../groups.service';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent implements OnInit {

  @Input() group: Group

  list: TransferItem[] = [
    {
      id: 1,
      title: 'Motoristas',
    },
    {
      id: 2,
      title: 'Visualizar Motoristas',
    },
    {
      id: 3,
      title: 'Adicionar Motorista',
    },
    {
      id: 4,
      title: 'Editar Motorista',
    },
    {
      id: 5,
      title: 'Excluir Motorista',
    },
    {
      id: 6,
      title: 'Clientes',
    },
    {
      id: 7,
      title: 'Visualizar Clientes',
    },
    {
      id: 8,
      title: 'Adicionar Cliente',
    },
    {
      id: 9,
      title: 'Editar Cliente',
    },
    {
      id: 10,
      title: 'Excluir Cliente',
    },
    {
      id: 11,
      title: 'Veiculos',
    },
    {
      id: 12,
      title: 'Visualizar Veiculos',
    },
    {
      id: 13,
      title: 'Adicionar Veiculo',
    },
    {
      id: 14,
      title: 'Editar Veiculo',
    },
    {
      id: 15,
      title: 'Excluir Veiculo',
    }
  ]

  formGroup: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [this.group?.name, [Validators.required]],
      permissions: [[]]
    })
  }

  change(items: TransferItem[]): void {
    console.log(items);
  }

}
