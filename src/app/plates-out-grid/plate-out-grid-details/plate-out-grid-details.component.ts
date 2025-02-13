import { Component, OnInit } from '@angular/core';
import { TerminalPlates, TerminalPlatesService } from '../plate-out-grid.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'plate-out-grid-details',
  templateUrl: './plate-out-grid-details.component.html',
  styleUrls: ['./plate-out-grid-details.component.css']
})
export class PlateOutGridDetailsComponent implements OnInit {
  isLoading = false;
  data: TerminalPlates[] | null = null;
  isApproved = false;

  constructor(
    private gertranDirectService: TerminalPlatesService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails(): void {
    this.isLoading = true;
    this.gertranDirectService.get().subscribe({
      next: (response) => {
        this.data = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.message.error('Erro ao carregar os detalhes.');
        console.error(error);
        this.isLoading = false;
      }
    });
  }

}
