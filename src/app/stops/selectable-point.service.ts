import { Injectable } from '@angular/core';
import {Stop, StopsService} from "./stops.service";
import {Subject} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {debounceTime} from "rxjs/operators";

interface Filters {
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SelectablePointService {
  isLoadingMoreData: boolean;
  points: Stop[] = [];
  searchPointSubject = new Subject<Filters>();

  private pointsNextUrl: string;

  constructor(
    private pointsService: StopsService,
    private message: NzMessageService,
  ) { }

  init(): void {
    this.loadMorePoints();
    this.setupSearch();
  }

  loadMorePoints(filters?: Filters): void {
    this.isLoadingMoreData = true;
    this.pointsService.getAll({
      limit: 50,
      url: this.pointsNextUrl
    }).subscribe((wagons) => {
      this.pointsNextUrl = wagons.next;
      this.points = [...this.points, ...wagons.results];
      this.isLoadingMoreData = false;
    }, () => {
      this.message.error('Erro ao carregar os caminhões!');
    });
  }

  searchByAddress(filter: Filters): void {
    if (filter.address === '') {
      this.pointsNextUrl = null;
      this.loadMorePoints();
    } else {
      this.searchPointSubject.next(filter);
    }
  }

  setupSearch(): void {
    this.searchPointSubject.pipe(debounceTime(500)).subscribe((filters) => {
      this.pointsService.getAll({ limit: 50 }).subscribe((result) => {
        this.points = result.results;
      });
    }, () => {
      this.message.error('Erro ao carregar os registros. Tente novamente.');
    });
  }
}
