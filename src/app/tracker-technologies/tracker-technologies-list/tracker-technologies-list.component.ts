import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TrackerTechnologiesService, TrackerTechnologies } from '../tracker-technologies.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-tracker-technologies-list',
  templateUrl: './tracker-technologies-list.component.html',
  styleUrls: ['./tracker-technologies-list.component.css'],
})
export class TrackerTechnologiesListComponent extends BaseCrudListComponent<TrackerTechnologies> {
  trackerTechnologiesColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ];

  constructor(
    router: Router,
    service: TrackerTechnologiesService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'tracker-technologies',
      router,
      service,
      message,
      modal,
    );
  }
}
