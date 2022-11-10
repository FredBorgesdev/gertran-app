import {Component, Input, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-monitoring-alert-modal',
  templateUrl: './monitoring-alert-modal.component.html',
  styleUrls: ['./monitoring-alert-modal.component.css']
})
export class MonitoringAlertModalComponent implements OnInit {
  @Input() urgent = false;

  isUrgentModalOpen = false;
  isLoading = false;
  urgentMessage: string = '';

  list = [];

  constructor(
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
  }

  markAsRead(item: any): void {
    if (this.urgent) {
      this.isUrgentModalOpen = true;
      return;
    }

    console.log(item);
  }

  resolveUrgency(): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente resolver a urgência?',
      nzContent: 'Ao resolver a urgência, o alerta será marcado como lido e não será mais exibido.',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.isUrgentModalOpen = false;
        }, 1000);
      },
      nzCancelText: 'Não',
    });
  }
}
