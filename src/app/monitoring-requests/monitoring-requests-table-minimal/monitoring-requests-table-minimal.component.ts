import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {GetAllResponse} from '../../shared/services/api.service';
import {MonitoringRequests} from '../monitoring-requests.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {differenceInMinutes} from 'date-fns';

@Component({
  selector: 'app-monitoring-requests-table-minimal',
  templateUrl: './monitoring-requests-table-minimal.component.html',
  styleUrls: ['./monitoring-requests-table-minimal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringRequestsTableMinimalComponent implements OnChanges {
  @Input() underReview: GetAllResponse<MonitoringRequests>;
  @Input() rowColor = 'inherit';
  @Output() handleQueryParamsChange = new EventEmitter<any>();

  monitoringRequests = [];

  isLoading = false;

  constructor(public authService: AuthenticationService) {
  }

  ngOnChanges(): void {
    this.monitoringRequests = [
      ...((this.underReview || {}).results || []),
    ].sort((a, b) => {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
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
    const createdInMinutes = (new Date().getTime() - new Date(item.updatedAt).getTime()) / 1000 / 60;

    if (createdInMinutes >= 15) {
      return 'bg-danger';
    }

    if (createdInMinutes >= 10) {
      return 'bg-alert';
    }
  }
}
