import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferItem } from 'ng-zorro-antd/transfer';
import {Group, GroupsService} from '../groups.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent extends BaseCrudFormComponent<Group> {

  group: Group;

  permissions: TransferItem[] = [
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
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    service: GroupsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  list(): void {
    this.router.navigate(['groups', 'groups-list']);
  }
}
