import { Component, OnInit } from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Terminals, TerminalsService} from '../terminals.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {TerminalGroups, TerminalGroupsService} from '../terminal-groups.service';
import {TransferChange, TransferItem} from 'ng-zorro-antd/transfer';
import {WagonsService} from '../../wagons/wagons.service';
import {Truck, TrucksService} from '../../trucks/trucks.service';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-terminals-form',
  templateUrl: './terminals-form.component.html',
  styleUrls: ['./terminals-form.component.css']
})
export class TerminalsFormComponent extends BaseCrudFormComponent<Terminals> implements OnInit {
  terminalGroups: TerminalGroups[] = [];

  vehicleTransferItems: TransferItem[] = [];
  selectedVehicles = [];

  resources: GetAllResponse<any>;
  searchPlateValue = '';
  plateFilterVisible = false;

  constructor(
    private formBuilder: FormBuilder,
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

    this.terminalGroupsService.getAll({ limit: 50 }).subscribe((response) => {
      this.terminalGroups = response.results;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      terminalGroup: [null, []],
    });
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues();

    this.validateForm.patchValue({
      terminalGroup: (this.resource.terminalGroup as TerminalGroups).id,
      vehicles: (this.resource.vehicles as Truck[]).map(({ id }) => id),
    });
  }

  performResourceChange(): void {
    this.selectedVehicles = (this.resource.vehicles as Truck['vehicle'][]).map(vehicle => ({
      id: vehicle.id,
      key: vehicle.id,
      title: vehicle.plate,
    }));

    // delete if more than one of the same in list
    for (let i = 0; i < this.selectedVehicles.length; i++) {
      for (let j = i + 1; j < this.selectedVehicles.length; j++) {
        if (this.selectedVehicles[i].id === this.selectedVehicles[j].id) {
          this.selectedVehicles.splice(j, 1);
        }
      }
    }

    this.vehicleTransferItems = this.vehicleTransferItems
      .concat(this.selectedVehicles)
      .map((item) => {
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
        vehicles: this.selectedVehicles.map((item) => item.key),
      }
    ).subscribe(() => {
      this.isLoading = false;
      this.message.success('Veiculos atualizados com sucesso!');
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao atualizar veiculos');
    });
  }

  setVehicles(url?: string): void {
    this.trucksService.getAll({ limit: 15, url }, { plate: this.searchPlateValue }).subscribe((response) => {
      this.resources = { ...response };
      // this.resources.results = response.results.map(item => this.toTransferItem(item));

      this.vehicleTransferItems = response.results
        .map(this.toTransferItem)
        .concat(this.selectedVehicles)
        .reduce(this.removeDuplicates, [])
        .map((item) => {
          const hasVehicle = this.selectedVehicles.some((vehicle) => vehicle.id === item.key);

          return {
            ...item,
            direction: hasVehicle ? 'right' : 'left',
          };
        });
    });
  }

  toTransferItem(item: Truck): TransferItem {
    return {
      key: item.vehicle.id,
      title: item.vehicle.plate,
    };
  }

  removeDuplicates(accumulator, current): TransferItem[] {
    const hasItem = accumulator.some((item) => item.key === current.key);

    if (hasItem) {
      return accumulator;
    }

    return [...accumulator, current];
  }

  list(): void {
    this.router.navigate(['terminals', 'terminals-list']);
  }

  get page(): number {
    return getCurrentPage(this.resources);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      const url = this.replaceOffsetWithPage(this.resources.previous, params.pageIndex);
      this.setVehicles(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(this.resources.next, params.pageIndex);
      this.setVehicles(url);
    }
  }

  private replaceOffsetWithPage(url: string, page: number): string {
    const limit = +url.match(/limit=\d+/)[0].split('=')[1];

    return url.replace(/offset=\d+/, `offset=${(limit * page) - limit}`);
  }

  handleChange($event: TransferChange): void {
    if ($event.to === 'right') {
      this.selectedVehicles = this.selectedVehicles.concat($event.list);
    }
    if ($event.to === 'left') {
      this.selectedVehicles = this.selectedVehicles.filter((item) => !$event.list.includes(item));
    }
  }

  search(): void {
    this.setVehicles();
    this.plateFilterVisible = false;
  }

  reset(): void {
    this.searchPlateValue = '';
    this.plateFilterVisible = false;
    this.setVehicles();
  }
}
