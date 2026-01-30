import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MonitoringRequests, MonitoringRequestsService, Status } from '../../monitoring-requests/monitoring-requests.service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication.service';
import User from '../../users/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MonitoringRequestsCheckListComponent } from '../../monitoring-requests/monitoring-requests-check-list/monitoring-requests-check-list.component';
import { Terminals, TerminalsService } from '../../terminals/terminals.service';
import { Customer } from '../../customers/customers.service';
import { SelectableCustomerServiceService } from '../../customers/selectable-customer-service.service';
import { differenceInMinutes } from 'date-fns';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
    selector: 'app-monitoring-release-list',
    templateUrl: './monitoring-release-list.component.html',
    styleUrls: ['./monitoring-release-list.component.css']
})
export class MonitoringReleaseListComponent implements OnInit, OnDestroy {
    isLoading = false;
    private firstLoad = true;
    private stopMonitoring = new Subject();

    monitoringColumns = [
        { title: ' ', nzLeft: true, style: 'z-index: 999', width: '40px' },
        { title: 'AVALIAÇÃO', nzLeft: true, width: '150px' },
        { title: 'Código', width: '100px' },
        { title: 'Placa', width: '80px' },
        { title: 'Carretas', width: '100px' },
        { title: 'Tecnologia', width: '100px' },
        { title: 'Nº Série', width: '120px' },
        { title: 'Isca', width: '100px' },
        { title: 'Nº de Ordem', width: '100px' },
        { title: 'Empresa', width: '150px' },
        { title: 'Motorista', width: '150px' },
        { title: 'Modificação', width: '120px' },
        { title: 'Saída', width: '120px' },
        { title: 'Chegada', width: '120px' },
        { title: 'Ult. Posição', width: '150px' },
    ];

    validateForm: FormGroup;
    monitoringData: any[] = [];
    refreshPositions = new EventEmitter();

    pageIndex = 1;
    pageSize = 10;
    total = 0;

    customers: Customer[] = [];
    terminals: Terminals[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private message: NzMessageService,
        private modal: NzModalService,
        private monitoringRequestService: MonitoringRequestsService,
        public authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private terminalsService: TerminalsService,
        public selectableCustomerService: SelectableCustomerServiceService
    ) { }

    ngOnInit(): void {
        this.monitoringColumns = this.monitoringColumns.filter(column => {
            if ((column as any).gertranStaffOnly) {
                return this.user.isGertranStaff;
            }
            return true;
        });

        this.validateForm = this.formBuilder.group({
            customer: [null],
            terminal: ['liberacao'],
        });

        this.loadFiltersList();

        timer(60000, 60000).pipe(
            takeUntil(this.stopMonitoring)
        ).subscribe(() => {
            this.loadData(true);
        });

        this.refreshPositions.pipe(
            takeUntil(this.stopMonitoring)
        ).subscribe(() => this.loadData(true));
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex } = params;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.loadData();
    }

    loadData(silent: boolean = false): void {
        if (!silent) {
            this.isLoading = true;
        }

        const offset = (this.pageIndex - 1) * this.pageSize;

        this.monitoringRequestService.getAll(
            { limit: this.pageSize, offset },
            { status: Status.UNDER_REVIEW, ordering: '-created_at' }
        ).subscribe(
            (response) => {
                const items = response.results.map(req => this.mapRequestToRow(req));

                this.monitoringData = [...items];
                this.total = response.count;
                this.isLoading = false;
            }
        );
    }

    private findValidChecklist(data: any[], hours: number) {
        if (!data) return undefined;
        const dateToCheck = new Date();
        dateToCheck.setHours(dateToCheck.getHours() - hours);
        return data.find(item => {
            const itemDate = new Date(item.reviewedAt);
            return itemDate >= dateToCheck;
        });
    }

    private mapRequestToRow(req: any): any {
        let calculatedChecklist = req.checklistReleased;
        if (req.customer?.checklistExpirationPeriod) {
            let hours = 0;
            switch (req.customer.checklistExpirationPeriod) {
                case 'twenty_four_hours': hours = 24; break;
                case 'sixty_days': hours = 60 * 24; break;
                case 'thirty_days': hours = 30 * 24; break;
                case 'fifteen_days': hours = 15 * 24; break;
                case 'seventy_two_hours': hours = 72; break;
            }

            if (hours > 0 && (req as any).checklistSet) {
                const validChecklist = this.findValidChecklist((req as any).checklistSet, hours);
                if (validChecklist) {
                    calculatedChecklist = validChecklist;
                }
            }
        }

        const trackers = req.truck?.vehicle?.trackers || req.truck?.trackers || [];

        const trackerSerialNumber = trackers.length > 0
            ? trackers.map(t => {
                const id = t.tracker_id || t.trackerId || 'S/N';

                const tech = t.tracker_model?.tracker_technology?.name ||
                    t.trackerModel?.trackerTechnology?.name || 'Tec.';

                return id;
            }).join(', ')
            : 'N/A';

        const baits = req.baits?.map(b => `${b.serialNumber} ${b.technology?.name}`).join(', ') || '';

        return {
            id: req.id,
            monitoringRequest: req,
            vehiclePlate: req.truck?.vehicle?.plate || req.truck?.plate || 'N/A',
            trackerSerialNumber: trackerSerialNumber,
            trackerTechnologyName: req.trackerTechnology?.name || 'N/A',
            customer: req.customer,
            positionDate: req.created_at || req.createdAt || new Date(),
            speed: 0,
            ignition: false,
            checklistReleased: calculatedChecklist,
            quantityReleasedTravels: (req as any).quantityReleasedTravels || 0,
            code: req.id,
            wagonsPlates: req.wagons?.map(w => w.vehicle.plate).join(', '),
            ocrNumber: req.loadingOrders?.map(l => l.ocrNumber).join(', '),
            company: req.customer?.tradingName,
            shipper: req.shipper?.tradingName || '-',
            driverName: req.driver?.name,
            updateDiff: this.getUpdateDiff(req.updatedAt),
            departure: this.getDepartureTime(req),
            arrival: this.getArrivalTime(req),
            lastPosition: req.lastPosition?.pointReference || req.lastPosition?.street || '-',
            baits: baits,
            statusTranslation: 'Em Análise'
        };
    }

    loadFiltersList(): void {
        if (this.authService.customerId) {
            const customer = this.authService.user.customer.find(c => c.id === this.authService.customerId);
            this.customers = [customer];
            this.validateForm.patchValue({ customer: this.authService.customerId });
            return;
        }

        this.selectableCustomerService.init();
        this.terminalsService.getAll({ limit: 50 }).subscribe(data => {
            this.terminals = data.results;
            this.terminals.push({
                id: 'liberacao',
                name: 'Terminal de Liberação',
            } as any);

            if (this.validateForm.get('terminal').value !== 'liberacao') {
                this.validateForm.patchValue({ terminal: 'liberacao' });
            }
        });
    }

    onTerminalChange(terminalId: string): void {
        if (terminalId && terminalId !== 'liberacao') {
            this.router.navigate(['/monitoring/monitoring-list'], { queryParams: { terminal: terminalId } });
        }
    }

    getUpdateDiff(dateStr: string): string {
        try {
            const diffInMinutes = differenceInMinutes(new Date(), new Date(dateStr));
            if (diffInMinutes > 60) {
                return `Atualizado há ${Math.floor(diffInMinutes / 60)}h`;
            }
            return `Atualizado há ${diffInMinutes}m`;
        } catch { return '-'; }
    }

    getDepartureTime(item: MonitoringRequests): string {
        try {
            const firstStep = item.travelSteps?.[0];
            return firstStep ? `${firstStep.date} ${firstStep.time}` : '';
        } catch { return ''; }
    }

    getArrivalTime(item: MonitoringRequests): string {
        try {
            const lastStep = item.travelSteps?.[item.travelSteps.length - 1];
            return lastStep ? `${lastStep.date} ${lastStep.time}` : '';
        } catch { return ''; }
    }

    ngOnDestroy(): void {
        this.stopMonitoring.next();
        this.stopMonitoring.complete();
    }

    get user(): User {
        return this.authService.user;
    }

    goToMonitoringRequest(id: string): void {
        this.modal.create({
            nzTitle: 'Solicitação de monitoramento',
            nzContent: MonitoringRequestsCheckListComponent,
            nzComponentParams: {
                monitoringRequestId: id,
                readOnly: true,
                showFooter: true,
            },
            nzWidth: '90%',
            nzAfterClose: this.refreshPositions
        });
    }

    getRowBackgroundColor(): string {
        return '';
    }

    trackByMonitoringId(index: number, item: any): string {
        return item.id;
    }
}