import { Injectable } from '@angular/core';
import {Truck, TrucksService} from './trucks.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class SelectableTruckService {
  isLoadingMoreData: boolean;
  private trucksNextUrl: string;
  trucks: Truck[] = [];

  constructor(
    private trucksService: TrucksService,
    private message: NzMessageService,
  ) {}

  init(): void {
    this.loadMoreTrucks();
  }

  loadMoreTrucks(filters?: { customerId: string }): void {
    this.isLoadingMoreData = true;
    this.trucksService.getAll({
      limit: 999,
      url: this.trucksNextUrl
    }, filters).subscribe((trucks) => {
      this.trucksNextUrl = trucks.next;
      this.trucks = [...this.trucks, ...trucks.results];
      this.isLoadingMoreData = false;
    }, () => {
      this.message.error('Erro ao carregar os caminhões!');
    });
  }
}
