import { Component, OnInit } from '@angular/core';
import { ChecklistsService, Checklist } from '../checklists.service'; // ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-checklist-expiration',
  templateUrl: './checklist-expiration.component.html',
})
export class CheckListExpirationComponent implements OnInit {
  checklists: Checklist[] = [];
  isLoading = false;

  page = 1;
  limit = 10;
  total = 0;

  constructor(private checklistService: ChecklistsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    const offset = (this.page - 1) * this.limit;
    console.log('ok')

    this.checklistService.getExp({ limit: this.limit })
      .subscribe({
        next: (res) => {
            console.log(res)
          this.checklists = res.results;
          this.total = res.count;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  onPageChange(pageIndex: number): void {
    this.page = pageIndex;
    this.fetchData();
  }
}
