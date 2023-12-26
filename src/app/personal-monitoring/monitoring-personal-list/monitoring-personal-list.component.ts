import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {PersonalMonitoringMapComponent} from '../monitoring-personal-map/monitoring-personal-map.component';
import {Customer} from '../../customers/customers.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PersonalPosition, PersonalPositionsService} from '../positions.service';
import {Observable, Subject, timer} from 'rxjs';
import {share, switchMap, takeUntil} from 'rxjs/operators';
import {GetAllResponse} from '../../shared/services/api.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import User from '../../users/user';

const PLATE_KEY = 'GERTRAN_LAST_PLATE';

@Component({
  selector: 'personal-monitoring-list',
  templateUrl: './monitoring-personal-list.component.html',
  styleUrls: ['./monitoring-personal-list.component.css']
})
export class PersonalMonitoringListComponent implements OnInit, OnDestroy {
  isLoading = false;
  personalMonitoringColumns = [
    {title: 'ID', nzLeft: true, style: 'z-index: 999', width: '40px'},
    {title: 'Token', nzLeft: true, style: 'z-index: 999', width: '90px'},
    {title: 'Usuário', nzLeft: true, style: 'z-index: 999', width: '60px'},
    {title: 'Data-Hora', nzLeft: true, style: 'z-index: 999', width: '60px'},
    {title: 'Mapa', width: '45px'},
  ];
  validateForm: FormGroup;

  stopMonitoring = new Subject();
  monitoringData$: Observable<GetAllResponse<PersonalPosition>>;
  monitoringData: PersonalPosition[] = null;
  refreshPositions = new EventEmitter();

  customers: Customer[] = [];

  isTableFullscreen = false;
  selectedTravelStatus: string;



  refreshAlertCount = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private modal: NzModalService,
    private formBuilder: FormBuilder,
    private positionsService: PersonalPositionsService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.monitoringData$ = timer(0, 100000).pipe(
      switchMap(() => this.getPositionsWithFilters()),
    );

    this.refreshPositions.subscribe(() => this.subscribeToMonitoringData());

    this.validateForm = this.formBuilder.group({
      customer: [this.activatedRoute.snapshot.queryParams.customer],
      hideOld: [true],
      groupBy: [null],
    });

    this.loadFiltersList();


    if (
      this.activatedRoute.snapshot.queryParams.customer ||
      this.authService.customerId
    ) {
      this.subscribeToMonitoringData();
    }
  }

  ngOnDestroy(): void {
    this.stopMonitoring.next();
  }


  openMap(item: PersonalPosition): void {
    this.modal.create({
      nzTitle: 'Mapa',
      nzContent: PersonalMonitoringMapComponent,
      nzWidth: '900px',
      nzComponentParams: {
        item
      }
    });
  }

  loadFiltersList(): void {
    if (this.authService.customerId) {
      const customer = this.authService.user.customer.find(c => c.id === this.authService.customerId);
      this.customers = [customer];
      this.validateForm.patchValue({customer: this.authService.customerId});
      return;
    }

    this.selectableCustomerService.init();

  }

  subscribeToMonitoringData(): void {
    if (
      !this.validateForm.get('customer').value
    ) {
      this.monitoringData = null;
      return;
    }

    this.isLoading = true;
    this.stopMonitoring.next();


    this.monitoringData$.subscribe(data => {
      this.monitoringData = data.results;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar lista');
    });
  }


  get user(): User {
    return this.authService.user;
  }

  private getPositionsWithFilters(): Observable<GetAllResponse<PersonalPosition>> {
    return this.positionsService.getAll(
      {limit: 999},
      {
        customer: this.validateForm.get('customer').value,
      }
    );
  }


}
