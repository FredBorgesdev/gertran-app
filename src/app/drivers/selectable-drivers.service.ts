import { Injectable } from '@angular/core';
import {Driver, DriversService} from './drivers.service';
import {Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectableDriversService {
  drivers: Driver[] = [];
  isLoadingMoreData: boolean;
  driversNextUrl: string;
  searchDriverSubject = new Subject<string>();

  constructor(
    private driversService: DriversService,
    private message: NzMessageService,
  ) {}

  init(): void {
    this.loadMoreDrivers();
    this.setupSearch();
  }

  loadMoreDrivers(): void {
    this.isLoadingMoreData = true;
    this.driversService.getAll({
      limit: 50,
      url: this.driversNextUrl
    }).subscribe((users) => {
      this.driversNextUrl = users.next;
      this.drivers = [...this.drivers, ...users.results];
      this.isLoadingMoreData = false;
    });
  }

  searchByName(name: string): void {
    if (name === '') {
      this.driversNextUrl = null;
      this.loadMoreDrivers();
    } else {
      this.searchDriverSubject.next(name);
    }
  }

  private setupSearch(): void {
    this.searchDriverSubject.pipe(debounceTime(500)).subscribe((search) => {
      this.driversService.getAll({ limit: 50 }, { search }).subscribe((result) => {
        this.drivers = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }

  resetFilters(): void {
    this.driversNextUrl = null;
    this.drivers = [];
    this.loadMoreDrivers();
  }

  appendDriver(driver: Driver) {
    this.drivers = [driver, ...this.drivers];
  }
}
