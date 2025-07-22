import { Component, OnInit } from '@angular/core';
import { ChecklistsService, Checklist } from '../../../checklists/checklists.service';

@Component({
  selector: 'app-checklist-expiration-modal',
  templateUrl: './checklist-expiration-modal.component.html'
})
export class ChecklistExpirationModalComponent implements OnInit {
  checklists: Checklist[] = [];
  isLoading = false;

  constructor(private checklistService: ChecklistsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.checklistService.getExp({ limit: 100 }).subscribe({
      next: (res) => {
        this.checklists = res.results;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
