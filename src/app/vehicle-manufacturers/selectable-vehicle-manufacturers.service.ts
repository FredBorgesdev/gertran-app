import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';
import {VehicleManufacturers, VehicleManufacturersService} from './vehicle-manufacturers.service';

@Injectable({
  providedIn: 'root'
})
export class SelectableVehicleManufacturersService {
  isLoadingMoreData: boolean;
  manufacturers: VehicleManufacturers[] = [];
  searchManufacturersSubject = new Subject<{
    name: string;
  }>();

  private manufacturersNextUrl: string;

  constructor(
    private manufacturersService: VehicleManufacturersService,
    private message: NzMessageService,
  ) {}

  init(): void {
    this.loadMoreManufacturers();
    this.setupSearch();
  }

  loadMoreManufacturers(filters?: { name: string }): void {
    this.isLoadingMoreData = true;
    this.manufacturersService.getAll({
      limit: 50,
      url: this.manufacturersNextUrl
    }, filters).subscribe((trucks) => {
      this.manufacturersNextUrl = trucks.next;
      this.manufacturers = [...this.manufacturers, ...trucks.results];
      this.isLoadingMoreData = false;
    }, () => {
      this.message.error('Erro ao carregar os caminhões!');
    });
  }

  concatManufacturers(manufacturers: VehicleManufacturers[]): void {
    this.manufacturers = [...manufacturers, ...this.manufacturers];
  }

  setupSearch(): void {
    this.searchManufacturersSubject.pipe(debounceTime(500)).subscribe((filters) => {
      this.manufacturersService.getAll({ limit: 50 }, filters).subscribe((result) => {
        this.manufacturers = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }

  resetFilters(): void {
    this.manufacturers = [];
    this.manufacturersNextUrl = null;
    this.loadMoreManufacturers();
  }
}
