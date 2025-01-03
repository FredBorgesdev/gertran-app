import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GertranDirect, GertranDirectService } from '../gertran-direct.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'gertran-direct-details',
  templateUrl: './gertran-direct-details.component.html',
  styleUrls: ['./gertran-direct-details.component.css']
})
export class GertranDirectDetailsComponent implements OnInit {
  isLoading = false;
  data: GertranDirect | null = null;
  isApproved = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gertranDirectService: GertranDirectService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fetchDetails(id);
    } else {
      this.message.error('ID não fornecido.');
    }
  }

  fetchDetails(id: string): void {
    this.isLoading = true;
    this.gertranDirectService.get(id).subscribe({
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

  approveDetail(): void {
    if (!this.data) {
      this.message.error('Nenhum dado disponível para aprovar.');
      return;
    }

    this.isLoading = true;
    this.gertranDirectService.approve(this.data.id).subscribe({
      next: () => {
        this.message.success('Detalhe aprovado com sucesso!');
        this.isApproved = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.message.error('Erro ao aprovar o detalhe.');
        console.error(error);
        this.isApproved = false;
        this.isLoading = false;
      }
    });
  }
}
