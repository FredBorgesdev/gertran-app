import {Injectable} from '@angular/core';
import {Truck, TrucksService} from './trucks.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectableTruckService {
  isLoadingMoreData: boolean;
  trucks: Truck[] = [];
  searchTruckSubject = new Subject<{
    customerId?: string;
    plate: string;
  }>();

  private trucksNextUrl: string;
  private currentFilters: { customerId?: string } = {};

  constructor(
    private trucksService: TrucksService,
    private message: NzMessageService,
  ) {
  }

  init(): void {
    this.loadMoreTrucks();
    this.setupSearch();
  }

  loadMoreTrucks(filters?: { customerId: string }): void {
    this.isLoadingMoreData = true;
    this.trucksService.getAll({
      limit: 50,
      url: this.trucksNextUrl
    }, filters).subscribe((trucks) => {
      this.trucksNextUrl = trucks.next;
      this.trucks = [...this.trucks, ...trucks.results];
      this.isLoadingMoreData = false;
    }, () => {
      this.message.error('Erro ao carregar os caminhões!');
    });
  }

  searchByPlate(filter: { customerId?: string; plate: string }): void {
    if (filter.plate === '') {
      this.trucksNextUrl = null;
      this.loadMoreTrucks();
    } else {
      this.searchTruckSubject.next(filter);
    }
  }

  appendTruck(truck: Truck): void {
    this.trucks = [truck, ...this.trucks];
  }

  appendTrucks(trucks: Truck[]): void {
    this.trucks = [...trucks, ...this.trucks];
  }

  setupSearch(): void {
    this.searchTruckSubject.pipe(debounceTime(500)).subscribe((filters) => {
      this.trucksService.getAll({limit: 50}, filters).subscribe((result) => {
        this.trucks = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }

  resetFilters(): void {
    this.trucks = [];
    this.trucksNextUrl = null;
    this.loadMoreTrucks();
  }
}
