import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Tracker, TrackersService} from '../trackers.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-trackers-table',
  templateUrl: './trackers-table.component.html',
  styleUrls: ['./trackers-table.component.css']
})
export class TrackersTableComponent extends BaseCrudListComponent<Tracker> implements OnInit {
  @Input() vehicleId: string;
  @Input() refreshTrackers: Observable<void>;
  @Output() openForm = new EventEmitter<void | Tracker>();

  trackersOrderColumn = [
    { title: 'ID' },
    { title: 'Número de série' },
    { title: 'Model do rastreador' },
    { title: 'Principal' },
    { title: 'Ações' },
  ];

  constructor(
    service: TrackersService,
    message: NzMessageService,
    modal: NzModalService,
    router: Router,
  ) {
    super(
      'trackers',
      router,
      service,
      message,
      modal
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.refreshTrackers.subscribe(() => {
      this.loadResources();
    });
  }

  edit(item: Tracker): void {
    this.openForm.emit(item);
  }

  additionalParams(): any[] {
    return [this.vehicleId];
  }
}
