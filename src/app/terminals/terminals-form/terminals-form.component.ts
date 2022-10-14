import { Component, OnInit } from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Terminals, TerminalsService} from '../terminals.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../customers/customers.service';
import {TerminalGroups, TerminalGroupsService} from '../terminal-groups.service';
import {TransferItem} from 'ng-zorro-antd/transfer';
import {WagonsService} from '../../wagons/wagons.service';
import {Truck, TrucksService} from '../../trucks/trucks.service';

@Component({
  selector: 'app-terminals-form',
  templateUrl: './terminals-form.component.html',
  styleUrls: ['./terminals-form.component.css']
})
export class TerminalsFormComponent extends BaseCrudFormComponent<Terminals> implements OnInit {
  customers: Customer[] = [];
  terminalGroups: TerminalGroups[] = [];

  vehicleTransferItems: TransferItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private terminalGroupsService: TerminalGroupsService,
    private router: Router,
    private wagonsService: WagonsService,
    private trucksService: TrucksService,
    service: TerminalsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.setVehicles();
    this.customersService.getAll({ limit: 999 }).subscribe((response) => {
      this.customers = response.results;
    });
    this.terminalGroupsService.getAll({ limit: 999 }).subscribe((response) => {
      this.terminalGroups = response.results;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      terminalGroup: [null, []],
    });
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues();

    this.validateForm.patchValue({
      customer: (this.resource.customer as Customer).id,
      terminalGroup: (this.resource.terminalGroup as TerminalGroups).id,
      vehicles: (this.resource.vehicles as Truck[]).map(({ id }) => id),
    });
  }

  performResourceChange(): void {
    this.vehicleTransferItems = this.vehicleTransferItems.map((item) => {
      const hasVehicle = this.resource.vehicles.some((vehicle) => vehicle.id === item.key);
      if (!hasVehicle) {
        return item;
      }

      return {
        ...item,
        direction: 'right',
      };
    });
  }

  saveVehicles(): void {
    this.isLoading = true;

    this.service.update(
      this.resource.id,
      {
        ...this.validateForm.value,
        vehicles: this.vehicleTransferItems.filter((item) => item.direction === 'right').map((item) => item.key),
      }
    ).subscribe(() => {
      this.isLoading = false;
      this.message.success('Veiculos atualizados com sucesso!');
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao atualizar veiculos');
    });
  }

  setVehicles(): void {
    this.trucksService.getAll({ limit: 999 }).subscribe((response) => {
      this.vehicleTransferItems = response.results.map(this.toTransferItem);
    });
  }

  toTransferItem(item: Truck): TransferItem {
    return {
      key: item.vehicle.id,
      title: item.vehicle.plate,
    };
  }

  list(): void {
    this.router.navigate(['terminals', 'terminals-list']);
  }
}
