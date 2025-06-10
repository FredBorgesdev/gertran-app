import { Injectable } from '@angular/core';
import { Ddr, DdrsService } from './ddrs.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class SelectableDdrService {
  ddrs: Ddr[] = [];
  isLoadingMoreData = false;
  ddrsNextUrl: string | null = null;
  searchDdrSubject = new Subject<string>();

  constructor(
    private ddrsService: DdrsService,
    private message: NzMessageService,
  ) {}

  init(): void {
    this.loadMoreDdrs();
    this.setupSearch();
  }

  loadMoreDdrs(): void {
    this.isLoadingMoreData = true;
    this.ddrsService.getAll({
      limit: 50,
      url: this.ddrsNextUrl || undefined
    }).subscribe({
      next: (response) => {
        this.ddrsNextUrl = response.next;
        this.ddrs = [...this.ddrs, ...response.results];
        this.isLoadingMoreData = false;
      },
      error: () => {
        this.isLoadingMoreData = false;
        this.message.error('Erro ao carregar DDRs. Tente novamente.');
      }
    });
  }

  searchByName(name: string): void {
    if (name.trim() === '') {
      this.ddrsNextUrl = null;
      this.ddrs = [];
      this.loadMoreDdrs();
    } else {
      this.searchDdrSubject.next(name);
    }
  }

  private setupSearch(): void {
    this.searchDdrSubject.pipe(
      debounceTime(2000)
    ).subscribe({
      next: (search) => {
        this.ddrsService.search({ limit: 50 }, search).subscribe({
          next: (result) => {
            this.ddrs = result.results;
            this.ddrsNextUrl = result.next;
          },
          error: () => {
            this.message.error('Erro ao carregar os registros. Tente novamente.');
          }
        });
      }
    });
  }
}
