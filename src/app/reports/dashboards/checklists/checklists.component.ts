import { Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Checklist, ChecklistsService } from '../../../checklists/checklists.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { BaseCrudListComponent } from '../../../base-crud/base-crud-list/base-crud-list.component';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { differenceInMinutes, format } from "date-fns";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.component.html',
  styleUrls: ['./checklists.component.css'],
  providers: [DatePipe],
})
export class ChecklistsComponent extends BaseCrudListComponent<Checklist> implements OnInit, OnDestroy {
  @Input() hideHeader = false;
  currentTime = '';
  currentTimeInterval: any;
  isFullScreen = false;

  checklistColumns = [
    { title: 'Data/Hora', width: '14%' },
    { title: 'Placa', width: '8%' },
    { title: 'Tecnologia', width: '10%' },
    { title: 'Cliente' },
    { title: 'Atualização', width: '16%' },
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

  getUpdateDiff(checklist: Checklist): string {
    const diffInMinutes = differenceInMinutes(
      new Date(),
      checklist.updatedAt ? new Date(checklist.updatedAt) : new Date(),
    );

    if (diffInMinutes > 60) {
      return `Atualizado à ${Math.floor(diffInMinutes / 60)}h`;
    }

    return `Atualizado à ${diffInMinutes}m`;
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  openFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  closeFullscreen() {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenModes(event: any) {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }
}
