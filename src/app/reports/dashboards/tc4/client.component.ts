import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PositionsService } from 'src/app/monitoring/positions.service';
import { MonitoringRequestsService } from 'src/app/monitoring-requests/monitoring-requests.service';
import { ReportsService } from '../../reports.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ControlTower4 implements OnInit {
  @Input() customerId: string;
  colors = ['#95ffa1', '#fcffab', '#86ffff', '#fcffab', '#ffd371']

  positionsData = {
    labels: [
      { status: 'VIAGEM', count: 0, color: '#95ffa1' },
      { status: 'PERNOITE', count: 0, color: '#fcffab' },
      { status: 'PARADO', count: 0, color: '#86ffff' },
      { status: 'AGUARDANDO INICIO', count: 0, color: '#fcffab' },
      { status: 'CLIENTE', count: 0, color: '#ffd371' }
    ],
    totalPositionsMonitoring: 0,
  }

  monitoringRequestsData = {
    labels: [
      { status: 'ANALISE', count: 0, color: 'blue' },
      { status: 'APROVADO', count: 0, color: 'green' },
      { status: 'REPROVADO', count: 0, color: 'red' }
    ],
    totalMonitoringRequests: 0,
  }

  checkListsData = {
    labels: [
      { status: 'SOLICITADO', count: 0, color: 'blue' },
      { status: 'APROVADO', count: 0, color: 'green' },
      { status: 'REPROVADO', count: 0, color: 'red' }
    ],
    totalCheckLists: 0,
  }

  operationsData = {
    labels: [],
    totalOperations: 0
  }


  operationsPositionsData = {
    labels: [],
    totalOperationsPositionsData: 0
  }

  // Mapa removido neste dashboard; manter estrutura vazia caso necessário em templates herdados
  mapMarkers: { lat: number; lng: number; plate: string; travelStatus: string }[] = [];

  // Referências dos gráficos para evitar múltiplas instanciações
  private positionsChart: Chart | null = null;
  private terminalsChart: Chart | null = null;
  private checkListChart: Chart | null = null;
  private monitoringChart: Chart | null = null;



  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private positionService: PositionsService,
    private service: MonitoringRequestsService,
    private reportsService: ReportsService,

  ) { }

  updateCharts() {
    this.loadPositions();
    this.loadMonitoringRequests();
    this.loadCheckLists();
  }

  ngOnInit() {
    console.log('[TC4] ngOnInit start');
    this.loadPositions();
    this.loadMonitoringRequests()
    this.loadCheckLists()

    setInterval(() => {
      console.log('[TC4] updateCharts interval tick');
      this.updateCharts();
    }, 15 * 60 * 1000);
  }

  incrementStatusCount(status: string, obj) {
    const label = this[obj].labels.find(label => label.status === status);
    if (label) {
      label.count++;
    }
  }

  createConfigChart(labels, data, backgroundColor) {
    const dataChart = {
      labels,
      datasets: [
        {
          label: '',
          data,
          backgroundColor,
        }
      ]
    };

    const config: any = {
      type: 'pie',
      data: dataChart,
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
          title: {
            display: false,
            text: ''
          }
        },
        aspectRatio: 0,
        maintainAspectRatio: false,
        width: 300,
        height: 200,
      },
    };
    return config
  }

  getClass(index: number): string {
    return 'legend-item legend-color' + (index + 1);
  }

  getPositionData(label: any): number {
    return label.count;
  }

  splitLabels(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  loadPositions(): void {
    console.log('[TC4] loadPositions start');
    const queryParams = new URLSearchParams(window.location.search);
    let customer = queryParams.get('customerId') || this.customerId;
    // Regra base: staff Gertran sempre vê global; clientes veem por cliente quando selecionado
    if (this.authService.user?.isGertranStaff) {
      customer = undefined as any;
    }
    if (!customer || customer === 'undefined' || customer === 'null') customer = undefined as any; // Geral quando não há cliente

    const { fromDate, toDate } = this.returnRange7Days();
    console.log('[TC4] loadPositions filters', { customer, fromDate, toDate });
    try {
      // Primeiro: carregar resumo agregado para status (mais performático)
      this.loadPositionsStatusSummary();
    } catch (e) {
      console.error('[TC4] loadPositionsStatusSummary threw', e);
    }

    // Segundo: carregar agregação por Terminais BH via endpoint resumido (performático)
    const filters: any = { ...this.returnRange7Days() };
    if (customer) filters.customer = customer;
    console.log('[TC4] calling getTerminalsSummary');
    this.reportsService.getTerminalsSummary({
      from: filters.fromDate,
      to: filters.toDate,
      customer: filters.customer,
    }).subscribe((items) => {
      console.log('[TC4] terminalsSummary response', items);
      // Excluir "Gertran" por nome se vier do backend sem filtro; manter robusto
      const filtered = items.filter(i => !/gertran/i.test(i.label || ''));

      const colors = ['#ff6b6b', '#4d96ff', '#ffd166', '#06d6a0', '#8d99ae', '#f4a261', '#118ab2'];
      this.operationsPositionsData.labels = filtered.map((it, idx) => ({
        status: it.label || 'Sem terminal',
        count: it.count || 0,
        color: colors[idx % colors.length],
      }));
      this.operationsPositionsData.totalOperationsPositionsData = filtered.reduce((acc, it) => acc + (it.count || 0), 0);

      const config2 = this.createConfigChart(
        this.operationsPositionsData.labels.map(x => x.status),
        this.operationsPositionsData.labels.map(x => x.count),
        this.operationsPositionsData.labels.map(x => x.color)
      );
      const ctx2 = document.getElementById('operationsPositionsChart') as HTMLCanvasElement;
      if (this.terminalsChart) {
        this.terminalsChart.destroy();
      }
      this.terminalsChart = new Chart(ctx2, config2);
    }, (err) => {
      console.warn('[TC4] terminalsSummary error', err);
    });
  }

  loadCheckLists() {
    console.log('[TC4] loadCheckLists start');
    const queryParams = new URLSearchParams(window.location.search);
    let customer = queryParams.get('customerId') || this.customerId || this.authService.customerId;
    if (this.authService.user?.isGertranStaff) customer = undefined as any;
    // Sanitizar possíveis valores string 'undefined'/'null'
    if (customer === 'undefined' || customer === 'null') customer = undefined as any;

    const { fromDate, toDate } = this.returnRange7Days()
    const checklistFilters: any = { from: fromDate, to: toDate };
    if (customer) checklistFilters.customer = customer;

    // Usar endpoint agregado performático
    console.log('[TC4] calling getChecklistSummary with', checklistFilters);
    this.reportsService.getChecklistSummary(checklistFilters).subscribe(summary => {
      console.log('[TC4] checklistSummary response', summary);
      // Reset
      this.checkListsData.labels = [
        { status: 'SOLICITADO', count: 0, color: 'blue' },
        { status: 'APROVADO', count: 0, color: 'green' },
        { status: 'REPROVADO', count: 0, color: 'red' }
      ];

      this.checkListsData.totalCheckLists = summary.total || 0;
      this.checkListsData.labels.find(l => l.status === 'SOLICITADO')!.count = summary.requested || 0;
      this.checkListsData.labels.find(l => l.status === 'APROVADO')!.count = summary.approved || 0;
      this.checkListsData.labels.find(l => l.status === 'REPROVADO')!.count = summary.reproved || 0;

      // Fallback: se o resumo vier zerado, buscar histórico e somar
      if (!this.checkListsData.totalCheckLists) {
        console.log('[TC4] checklistSummary total=0, fallback getChecklistHistory');
        const historyFilters: any = { from: fromDate, to: toDate, plate: '' };
        if (customer) historyFilters.customer = customer;
        this.reportsService.getChecklistHistory(historyFilters).subscribe(response => {
          console.log('[TC4] checklistHistory fallback response length', response?.length);
          this.checkListsData.labels.forEach(l => l.count = 0);
          response.forEach(item => {
            switch (item.status) {
              case 'approved':
                this.incrementStatusCount('APROVADO', 'checkListsData');
                break;
              case 'reproved':
                this.incrementStatusCount('REPROVADO', 'checkListsData');
                break;
              case 'requested':
                this.incrementStatusCount('SOLICITADO', 'checkListsData');
                break;
            }
          });
          this.checkListsData.totalCheckLists = response.length || 0;
          const configFb = this.createConfigChart(
            this.checkListsData.labels.map(x => x.status),
            this.checkListsData.labels.map(x => x.count),
            this.checkListsData.labels.map(x => x.color)
          );
          const ctxFb = document.getElementById('checkListChart') as HTMLCanvasElement;
          if (this.checkListChart) this.checkListChart.destroy();
          this.checkListChart = new Chart(ctxFb, configFb);
        }, (err2) => {
          console.warn('[TC4] checklistHistory fallback error', err2);
          // Segundo fallback: ampliar período para 30 dias e tentar novamente
          const current = new Date();
          const thirtyDaysAgo = new Date(current);
          thirtyDaysAgo.setDate(current.getDate() - 30);
          const altFrom = this.formatDate(thirtyDaysAgo);
          const altTo = this.formatDate(current);
          const altFilters: any = { from: altFrom, to: altTo, plate: '' };
          if (customer) altFilters.customer = customer;
          console.log('[TC4] checklistHistory 30d fallback with', altFilters);
          this.reportsService.getChecklistHistory(altFilters).subscribe(resp30 => {
            console.log('[TC4] checklistHistory 30d fallback response length', resp30?.length);
            this.checkListsData.labels.forEach(l => l.count = 0);
            resp30.forEach(item => {
              switch (item.status) {
                case 'approved':
                  this.incrementStatusCount('APROVADO', 'checkListsData');
                  break;
                case 'reproved':
                  this.incrementStatusCount('REPROVADO', 'checkListsData');
                  break;
                case 'requested':
                  this.incrementStatusCount('SOLICITADO', 'checkListsData');
                  break;
              }
            });
            this.checkListsData.totalCheckLists = resp30.length || 0;
            const config30 = this.createConfigChart(
              this.checkListsData.labels.map(x => x.status),
              this.checkListsData.labels.map(x => x.count),
              this.checkListsData.labels.map(x => x.color)
            );
            const ctx30 = document.getElementById('checkListChart') as HTMLCanvasElement;
            if (this.checkListChart) this.checkListChart.destroy();
            this.checkListChart = new Chart(ctx30, config30);
          }, (err30) => {
            console.warn('[TC4] checklistHistory 30d fallback error', err30);
          });
        });
        return;
      }

      const config = this.createConfigChart(
        this.checkListsData.labels.map(x => x.status),
        this.checkListsData.labels.map(x => x.count),
        this.checkListsData.labels.map(x => x.color)
      );

      const ctx = document.getElementById('checkListChart') as HTMLCanvasElement;
      if (this.checkListChart) {
        this.checkListChart.destroy();
      }
      this.checkListChart = new Chart(ctx, config);
    }, (err) => {
      console.warn('[TC4] checklistSummary error', err);
      // Fallback direto em caso de erro
      const historyFilters: any = { from: fromDate, to: toDate, plate: '' };
      if (customer) historyFilters.customer = customer;
      console.log('[TC4] checklistSummary error -> fallback getChecklistHistory', historyFilters);
      this.reportsService.getChecklistHistory(historyFilters).subscribe(response => {
        console.log('[TC4] checklistHistory fallback(response) length', response?.length);
        this.checkListsData.labels.forEach(l => l.count = 0);
        response.forEach(item => {
          switch (item.status) {
            case 'approved':
              this.incrementStatusCount('APROVADO', 'checkListsData');
              break;
            case 'reproved':
              this.incrementStatusCount('REPROVADO', 'checkListsData');
              break;
            case 'requested':
              this.incrementStatusCount('SOLICITADO', 'checkListsData');
              break;
          }
        });
        this.checkListsData.totalCheckLists = response.length || 0;
        const configFb = this.createConfigChart(
          this.checkListsData.labels.map(x => x.status),
          this.checkListsData.labels.map(x => x.count),
          this.checkListsData.labels.map(x => x.color)
        );
        const ctxFb = document.getElementById('checkListChart') as HTMLCanvasElement;
        if (this.checkListChart) this.checkListChart.destroy();
        this.checkListChart = new Chart(ctxFb, configFb);
      }, (err2) => {
        console.warn('[TC4] checklistSummary error -> fallback getChecklistHistory error', err2);
        this.checkListsData.totalCheckLists = 0;
        this.checkListsData.labels.forEach(l => l.count = 0);
      });
    });
  }

  loadMonitoringRequests() {
    console.log('[TC4] loadMonitoringRequests start');
    const queryParams = new URLSearchParams(window.location.search);

    const { fromDate, toDate } = this.returnRange7Days()
  let customer = queryParams.get('customerId') || this.customerId || this.authService.customerId;
  if (this.authService.user?.isGertranStaff) customer = undefined as any;
    if (customer === 'undefined' || customer === 'null') customer = undefined as any;
    const filters: any = { from: fromDate, to: toDate };
    if (customer) filters.customer = customer;

    // Usar resumo agregado do backend
    console.log('[TC4] calling getMonitoringStatusSummary with', filters);
    this.reportsService.getMonitoringStatusSummary(filters).subscribe(summary => {
      console.log('[TC4] monitoringStatusSummary response', summary);
      this.monitoringRequestsData.labels = [
        { status: 'ANALISE', count: 0, color: 'blue' },
        { status: 'APROVADO', count: 0, color: 'green' },
        { status: 'REPROVADO', count: 0, color: 'red' }
      ];

      this.monitoringRequestsData.totalMonitoringRequests = summary.total || 0;
      this.monitoringRequestsData.labels.find(l => l.status === 'ANALISE')!.count = summary.analise || 0;
      this.monitoringRequestsData.labels.find(l => l.status === 'APROVADO')!.count = summary.aprovado || 0;
      this.monitoringRequestsData.labels.find(l => l.status === 'REPROVADO')!.count = summary.reprovado || 0;

      const config = this.createConfigChart(
        this.monitoringRequestsData.labels.map(x => x.status),
        this.monitoringRequestsData.labels.map(x => x.count),
        this.monitoringRequestsData.labels.map(x => x.color)
      );
      const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
      if (this.monitoringChart) {
        this.monitoringChart.destroy();
      }
      this.monitoringChart = new Chart(ctx, config);
    }, (err) => {
      console.warn('[TC4] monitoringStatusSummary error', err);
      // Fallback: usar listagem para calcular
      console.log('[TC4] fallback getAll monitoring requests');
      this.service
        .getAll({ limit: 999 }, { customer: customer, fromDate: fromDate, toDate: toDate })
        .subscribe((result) => {
          console.log('[TC4] fallback monitoring requests response', result);
          this.monitoringRequestsData.labels = [
            { status: 'ANALISE', count: 0, color: 'blue' },
            { status: 'APROVADO', count: 0, color: 'green' },
            { status: 'REPROVADO', count: 0, color: 'red' }
          ];
          result.results.forEach(item => {
            switch (item.status) {
              case 'under_review':
                this.incrementStatusCount('ANALISE', 'monitoringRequestsData');
                break;
              case 'in_progress':
              case 'finished':
                this.incrementStatusCount('APROVADO', 'monitoringRequestsData');
                break;
              case 'reproved':
              case 'terminated_disapproved':
                this.incrementStatusCount('REPROVADO', 'monitoringRequestsData');
                break;
            }
          });
          this.monitoringRequestsData.totalMonitoringRequests = result.results.length;
          const config = this.createConfigChart(
            this.monitoringRequestsData.labels.map(x => x.status),
            this.monitoringRequestsData.labels.map(x => x.count),
            this.monitoringRequestsData.labels.map(x => x.color)
          );
          const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
          if (this.monitoringChart) {
            this.monitoringChart.destroy();
          }
          this.monitoringChart = new Chart(ctx, config);
        });
    });
  }

  // Substitui contagem de status por relatório logístico (agregado no backend)
  private loadPositionsStatusSummary(): void {
    const queryParams = new URLSearchParams(window.location.search);
    let customer = queryParams.get('customerId') || this.customerId || this.authService.customerId;
    if (this.authService.user?.isGertranStaff) customer = undefined as any;
    if (customer === 'undefined' || customer === 'null') customer = undefined as any;

    const { fromDate, toDate } = this.returnRange7Days();

    const filters: any = { from: fromDate, to: toDate };
    if (customer) filters.customer = customer;

    console.log('[TC4] calling getMonitoringTravelStatusSummary with', filters);
    this.reportsService.getMonitoringTravelStatusSummary(filters).subscribe(summary => {
      console.log('[TC4] monitoringTravelStatusSummary response', summary);
      this.positionsData.labels.forEach(l => l.count = 0);
      const aguardando = (summary as any).aguardando_inicio ?? (summary as any).aguardandoInicio ?? 0;
      const map: Record<string, number> = {
        'VIAGEM': (summary as any).viagem || 0,
        'PERNOITE': (summary as any).pernoite || 0,
        'PARADO': (summary as any).parado || 0,
        'AGUARDANDO INICIO': aguardando,
        'CLIENTE': (summary as any).cliente || 0,
      };
      this.positionsData.labels.forEach(l => { l.count = map[l.status] || 0; });
      this.positionsData.totalPositionsMonitoring = summary.total || Object.values(map).reduce((a, b) => a + b, 0);

      // Validação de consistência com Terminais BH (quando disponível)
      const terminalsTotal = this.operationsPositionsData.totalOperationsPositionsData || 0;
      if (terminalsTotal && this.positionsData.totalPositionsMonitoring && terminalsTotal !== this.positionsData.totalPositionsMonitoring) {
        console.warn('[TC4] Divergência entre Terminais BH total', terminalsTotal, 'e Viagens Monitoradas total', this.positionsData.totalPositionsMonitoring);
      }

      const config = this.createConfigChart(
        this.positionsData.labels.map(x => x.status),
        this.positionsData.labels.map(x => x.count),
        this.positionsData.labels.map(x => x.color)
      );
      const ctx = document.getElementById('positonsChart') as HTMLCanvasElement;
      if (this.positionsChart) {
        this.positionsChart.destroy();
      }
      this.positionsChart = new Chart(ctx, config);
    }, (err) => {
      console.warn('[TC4] monitoringTravelStatusSummary error', err);
      // Fallback: calcular status a partir das MonitoringRequests se o resumo não estiver disponível
      const queryParams = new URLSearchParams(window.location.search);
      let customer = queryParams.get('customerId') || this.customerId || this.authService.customerId;
      if (customer === 'undefined' || customer === 'null') customer = undefined as any;
      const { fromDate, toDate } = this.returnRange7Days();
      console.log('[TC4] fallback getAll monitoring requests for travel status');
      this.service.getAll({ limit: 999 }, { customer, fromDate, toDate }).subscribe(result => {
        console.log('[TC4] fallback monitoring requests travel status response', result);
        this.positionsData.labels.forEach(l => l.count = 0);
        result.results.forEach(item => {
          switch (item.travelStatus) {
            case 'in_progress':
            case 'contingency':
            case 'logistic_management':
              this.incrementStatusCount('VIAGEM', 'positionsData');
              break;
            case 'driver_in_overnight':
              this.incrementStatusCount('PERNOITE', 'positionsData');
              break;
            case 'stopped':
              this.incrementStatusCount('PARADO', 'positionsData');
              break;
            case 'waiting_for_start':
              this.incrementStatusCount('AGUARDANDO INICIO', 'positionsData');
              break;
            case 'vehicle_in_customer':
              this.incrementStatusCount('CLIENTE', 'positionsData');
              break;
          }
        });
        this.positionsData.totalPositionsMonitoring = result.results.length;
        const config = this.createConfigChart(
          this.positionsData.labels.map(x => x.status),
          this.positionsData.labels.map(x => x.count),
          this.positionsData.labels.map(x => x.color)
        );
        const ctx = document.getElementById('positonsChart') as HTMLCanvasElement;
        if (this.positionsChart) {
          this.positionsChart.destroy();
        }
        this.positionsChart = new Chart(ctx, config);
      }, (err2) => {
        console.warn('[TC4] fallback monitoring requests travel status error', err2);
      });
    });
  }

  returnRange7Days() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    const fromDate = this.formatDate(sevenDaysAgo);
    const toDate = this.formatDate(currentDate);
    return { fromDate, toDate };
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}

