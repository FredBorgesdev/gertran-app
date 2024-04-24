import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Checklist, ChecklistsService} from '../../../checklists/checklists.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {BaseCrudListComponent} from '../../../base-crud/base-crud-list/base-crud-list.component';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {differenceInMinutes, format} from 'date-fns';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-client-checklists',
  templateUrl: './client-checklists.component.html',
  styleUrls: ['./client-checklists.component.css'],
  providers: [DatePipe],
})
export class ClientChecklistsComponent extends BaseCrudListComponent<Checklist> implements OnInit, OnDestroy {
  @Input() hideHeader = false;
  currentTime = '';
  currentTimeInterval: any;

  checklistColumns = [
    {title: 'Data/hora',  width: '20%'},
    {title: 'Placa', width: '12%'},
    {title: 'Tec', width: '12%'},
    {title: 'Origem',width: '20%'},
    {title: 'Destino',width: '20%'},
    {title: 'Status', width: '18%'}
  ];

  stopRefreshing = new Subject();

  constructor(
    router: Router,
    service: ChecklistsService,
    message: NzMessageService,
    modal: NzModalService,
    public authService: AuthenticationService,
    private datePipe: DatePipe,
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

    this.currentTimeInterval = setInterval(() => {
      this.currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss');
    }, 1000);
  }

  performPostLoadActions(): void {
    this.resources.results = this.resources.results.sort(
      (a, b) => {
        const createdInMinutesA = differenceInMinutes(new Date(), new Date(a.createdAt));
        const createdInMinutesB = differenceInMinutes(new Date(), new Date(b.createdAt));

        if (createdInMinutesA > createdInMinutesB) {
          return -1;
        }

        if (createdInMinutesA < createdInMinutesB) {
          return 1;
        }

        return 0;
      }
    );
  }

  ngOnDestroy(): void {
    this.stopRefreshing.next();
    clearInterval(this.currentTimeInterval);
  }

  edit(resource: Checklist): void {
    this.router.navigate(['checklists', 'checklists-review', resource.id]);
  }

  getRowClass(item: Checklist): string {
    if (!this.authService.user.isGertranStaff) {
      return '';
    }

    const createdInMinutes = (new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60;

    if (createdInMinutes >= 15) {
      return 'bg-danger';
    }

    if (createdInMinutes >= 10) {
      return 'bg-alert';
    }
  }

  getStatusTranslated(status: string): string {
    switch (status.toLowerCase()) {
      case 'requested':
        return 'avaliação';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
    }
  }

  //#hmn***fitmap
  fitMap() {
    const sizeMapInnerHeight = window.innerHeight;
    const sizeMapInnerWidth = window.innerWidth;
    try {
      document.getElementById("googleMap").style.height =
        sizeMapInnerHeight + "px";
      document.getElementById("googleMap").style.width = sizeMapInnerWidth + "px";
    } catch (error) {
      console.log('mapa não carregado')
    }
  }


}
