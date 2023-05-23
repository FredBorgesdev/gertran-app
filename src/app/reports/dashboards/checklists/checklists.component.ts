import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Checklist, ChecklistsService} from '../../../checklists/checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {BaseCrudListComponent} from '../../../base-crud/base-crud-list/base-crud-list.component';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.component.html',
  styleUrls: ['./checklists.component.css']
})
export class ChecklistsComponent extends BaseCrudListComponent<Checklist> implements OnInit, OnDestroy {
  checklistColumns = [
    {title: 'Data criação'},
    {title: 'Placa'},
    {title: 'Tecnologia'},
    {title: 'Cliente'},
    {title: 'Motorista'},
    {title: 'Origem'},
    {title: 'Destino'},
    {title: 'Ações'}
  ];

  stopRefreshing = new Subject();

  constructor(
    router: Router,
    service: ChecklistsService,
    message: NzMessageService,
    modal: NzModalService,
    public authService: AuthenticationService
  ) {
    super(
      'checklists',
      router,
      service,
      message,
      modal
    );
  }

  ngOnInit(): void {
    this.setupSearch();

    timer(0, 1 * 60 * 1000).pipe(
      takeUntil(this.stopRefreshing)
    ).subscribe(() => {
      this.loadResources();
    });
  }

  ngOnDestroy(): void {
    this.stopRefreshing.next();
  }

  edit(resource: Checklist): void {
    this.router.navigate(['checklists', 'checklists-review', resource.id]);
  }
}
