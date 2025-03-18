import { Injectable } from '@angular/core';
import {Truck} from '../trucks/trucks.service';
import {Subject} from 'rxjs';
import {Wagon, WagonsService} from './wagons.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {debounceTime} from 'rxjs/operators';

interface Filters {
  customer?: string;
  plate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SelectableWagonService {
  isLoadingMoreData: boolean;
  wagons: Wagon[] = [];
  searchTruckSubject = new Subject<Filters>();

  private wagonsNextUrl: string;

  constructor(
    private wagonsService: WagonsService,
    private message: NzMessageService,
  ) { }

  init(): void {
    this.loadMoreWagons();
    this.setupSearch();
  }

  loadMoreWagons(filters?: Filters): void {
    this.isLoadingMoreData = true;
    this.wagonsService.getAll({
      limit: 50,
      url: this.wagonsNextUrl
    }, filters).subscribe((wagons) => {
      this.wagonsNextUrl = wagons.next;
      this.wagons = [...this.wagons, ...wagons.results];
      this.isLoadingMoreData = false;
    }, () => {
      this.message.error('Erro ao carregar os caminhões!');
    });
  }

  searchByPlate(filter: { customerId?: string; plate: string }): void {
    if (filter.plate === '') {
      this.wagonsNextUrl = null;
      this.loadMoreWagons();
    } else {
      this.searchTruckSubject.next(filter);
    }
  }

  appendTruck(truck: Truck): void {
    this.wagons = [truck, ...this.wagons];
  }

  setupSearch(): void {
    this.searchTruckSubject.pipe(debounceTime(2000)).subscribe((filters) => {
      this.wagonsService.getAll({ limit: 50 }, filters).subscribe((result) => {
        this.wagons = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }

  resetFilters(): void {
    this.wagons = [];
    this.wagonsNextUrl = null;
    this.loadMoreWagons();
  }
}
