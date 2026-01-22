import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { GetAllResponse } from '../../shared/services/api.service';
import { MonitoringRequests, Status } from '../monitoring-requests.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { differenceInMinutes, format } from 'date-fns';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-monitoring-requests-table-minimal',
  templateUrl: './monitoring-requests-table-minimal.component.html',
  styleUrls: ['./monitoring-requests-table-minimal.component.css'],
})
export class MonitoringRequestsTableMinimalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() underReview: GetAllResponse<MonitoringRequests>;
  @Input() rowColor = 'inherit';
  @Output() handleQueryParamsChange = new EventEmitter<any>();

  monitoringRequests = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;

  isLoading = false;
  private stopTimer = new Subject<void>();

  readonly finishedStatuses = [
    Status.IN_PROGRESS,
    Status.REPROVED,
    Status.FINISHED,
    Status.SUCCESSFULLY_TERMINATED,
    Status.CANCELED,
    Status.UNSUCCESSFULLY_TERMINATED,
    Status.TERMINATED_DISAPPROVED,
    Status.STOLEN_CONFIRMED
  ];

  constructor(
    public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    interval(30000).pipe(
      takeUntil(this.stopTimer)
    ).subscribe(() => {
      this.nextPage();
    });
  }

  ngOnDestroy(): void {
    this.stopTimer.next();
    this.stopTimer.complete();
  }

  ngOnChanges(): void {
    this.monitoringRequests = [
      ...((this.underReview || {}).results || []),
    ].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.totalPages = Math.ceil(this.monitoringRequests.length / this.pageSize) || 1;

    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getUpdateDiff(monitoringRequest: MonitoringRequests): string {
    const diffInMinutes = differenceInMinutes(
      new Date(),
      new Date(monitoringRequest.updatedAt)
    );

    if (diffInMinutes > 60) {
      return `Atualizado à ${Math.floor(diffInMinutes / 60)}h`;
    }

    return `Atualizado à ${diffInMinutes}m`;
  }

  getStatusLabel(status: Status): string {
    const statusLabels: Record<Status, string> = {
      [Status.DRAFT]: 'Rascunho',
      [Status.UNDER_REVIEW]: 'Em análise',
      [Status.WAITING_FOR_START]: 'Aguardando início',
      [Status.IN_PROGRESS]: 'Aprovado',
      [Status.REPROVED]: 'Reprovado',
      [Status.FINISHED]: 'Finalizado',
      [Status.SUCCESSFULLY_TERMINATED]: 'Encerrado com sucesso',
      [Status.CANCELED]: 'Cancelado',
      [Status.UNSUCCESSFULLY_TERMINATED]: 'Encerrado sem sucesso',
      [Status.TERMINATED_DISAPPROVED]: 'Encerrado reprovado',
      [Status.POTENTIALLY_STOLEN]: 'Potencialmente roubado',
      [Status.STOLEN_CONFIRMED]: 'Roubo confirmado',
      [Status.PENDING]: 'Pendente',
      [Status.IMPORTED_UNAVAILABLE]: 'Importado indisponível',
    };

    return statusLabels[status] || status;
  }

  getReleasedTime(monitoringRequest: MonitoringRequests): { main: string, sub?: string } {
    if (monitoringRequest.status === Status.IN_PROGRESS) {
      if (!monitoringRequest.releasedAt) {
        return { main: 'Aguardando liberação', sub: '' };
      }
      return {
        main: format(new Date(monitoringRequest.releasedAt), 'dd/MM/yyyy HH:mm'),
        sub: ''
      };
    }

    if (this.finishedStatuses.includes(monitoringRequest.status)) {
      return {
        main: format(new Date(monitoringRequest.updatedAt), 'dd/MM/yyyy HH:mm'),
        sub: ''
      };
    }

    return { main: 'Aguardando avaliação', sub: '' };
  }

  getUnderReviewAlert(monitoringRequest: MonitoringRequests): {
    class: string;
    message: string;
  } {
    const diffInMinutes = differenceInMinutes(
      new Date(),
      new Date(monitoringRequest.updatedAt)
    );

    if (diffInMinutes > 15) {
      return {
        class: 'red-alert',
        message: 'Liberação atrasada',
      };
    }

    if (diffInMinutes > 10) {
      return {
        class: 'yellow-alert',
        message: 'Em avaliação',
      };
    }

    return {
      class: 'default-alert',
      message: 'Em avaliação',
    };
  }

  getRowName(item: MonitoringRequests): string {
    if (item.status === Status.IN_PROGRESS) {
      return 'bg-success-legend';
    }

    if (item.status === Status.REPROVED) {
      return 'bg-danger-legend';
    }

    if (item.status === Status.UNDER_REVIEW) {
      const diffInMinutes = differenceInMinutes(new Date(), new Date(item.updatedAt));

      if (diffInMinutes >= 10) {
        return 'bg-warning-legend';
      }

      return '';
    }

    return '';
  }
}