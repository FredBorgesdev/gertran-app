import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
export class ControlTower4 implements OnInit, OnDestroy {
  @Input() customerId: string;

  isLoading = false;
  intervalId: any;

  colors = ['#95ffa1', '#fcffab', '#86ffff', '#fcffab', '#ffd371'];

  // Dados do Gráfico da Direita
  positionsData = {
    labels: [
      { status: 'VIAGEM', count: 0, color: '#95ffa1' },
      { status: 'PERNOITE', count: 0, color: '#fcffab' },
      { status: 'PARADO', count: 0, color: '#86ffff' },
      { status: 'AGUARDANDO INICIO', count: 0, color: '#fcffab' },
      { status: 'CLIENTE', count: 0, color: '#ffd371' }
    ],
    totalPositionsMonitoring: 0,
    totalMonitoredValue: 0,
  };

  // Dados do Gráfico da Esquerda
  operationsPositionsData = {
    labels: [],
    totalOperationsPositionsData: 0
  };

  // Referências dos gráficos (Removido 'monitoring')
  private charts: { [key: string]: Chart | null } = {
    positions: null,
    terminals: null
  };

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private positionService: PositionsService,
    private service: MonitoringRequestsService,
    private reportsService: ReportsService,
  ) { }

  ngOnInit() {
    if (!this.authService.user?.isGertranStaff) {
      this.router.navigate(['/reports/dashboards/client']);
      return;
    }

    this.updateCharts();

    this.intervalId = setInterval(() => {
      this.updateCharts();
    }, 15 * 60 * 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
  }

  updateCharts() {
    this.isLoading = true;
    this.loadPositions();
    // loadMonitoringRequests foi removido
    setTimeout(() => this.isLoading = false, 1000);
  }

  // --- CARREGAMENTO DOS 2 GRÁFICOS DE CIMA ---

  loadPositions(): void {
    const queryParams = new URLSearchParams(window.location.search);
    let customer = queryParams.get('customerId') || this.customerId;
    if (this.authService.user?.isGertranStaff) customer = undefined as any;
    if (!customer || customer === 'undefined' || customer === 'null') customer = undefined as any;

    const { fromDate, toDate } = this.returnRange7Days();
    const filters: any = { from: fromDate, to: toDate };
    if (customer) filters.customer = customer;

    // 1. Gráfico de Status (Direita)
    this.reportsService.getMonitoringTravelStatusSummary(filters).subscribe({
      next: (summary) => {
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
        this.positionsData.totalMonitoredValue = (summary as any).totalValue || 0;
        this.renderChart('positonsChart', this.positionsData, 'positions');
      },
      error: () => {
        // Fallback
        this.service.getAll({ limit: 3000 }, { customer, fromDate, toDate }).subscribe(result => {
          const validItems = result.results.filter(i => i.status !== 'draft' && i.status !== 'canceled');
          this.positionsData.labels.forEach(l => l.count = 0);
          validItems.forEach(item => {
            const tStatus = (item as any).travelStatus;
            switch (tStatus) {
              case 'in_progress': case 'contingency': case 'logistic_management':
                this.incrementStatusCount('VIAGEM', 'positionsData'); break;
              case 'driver_in_overnight': this.incrementStatusCount('PERNOITE', 'positionsData'); break;
              case 'stopped': this.incrementStatusCount('PARADO', 'positionsData'); break;
              case 'waiting_for_start': this.incrementStatusCount('AGUARDANDO INICIO', 'positionsData'); break;
              case 'vehicle_in_customer': this.incrementStatusCount('CLIENTE', 'positionsData'); break;
            }
          });
          this.positionsData.totalPositionsMonitoring = validItems.length;
          this.renderChart('positonsChart', this.positionsData, 'positions');
        });
      }
    });

    // 2. Gráfico de Terminais (Esquerda)
    this.reportsService.getTerminalsSummary(filters).subscribe({
      next: (items) => {
        const filtered = items.filter(i => !/gertran/i.test(i.label || ''));
        const chartColors = ['#ff6b6b', '#4d96ff', '#ffd166', '#06d6a0', '#8d99ae', '#f4a261', '#118ab2'];
        this.operationsPositionsData.labels = filtered.map((it, idx) => ({
          status: it.label || 'Sem terminal',
          count: it.count || 0,
          color: chartColors[idx % chartColors.length],
        }));
        this.operationsPositionsData.totalOperationsPositionsData = filtered.reduce((acc, it) => acc + (it.count || 0), 0);
        this.renderChart('operationsPositionsChart', this.operationsPositionsData, 'terminals');
      },
      error: (err) => console.warn(err)
    });
  }

  // --- RENDERIZAÇÃO ---

  private renderChart(canvasId: string, dataObj: any, chartKey: string) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!ctx) return;

    if (this.charts[chartKey]) {
      this.charts[chartKey]?.destroy();
      this.charts[chartKey] = null;
    }

    const config: any = {
      type: 'pie',
      data: {
        labels: dataObj.labels.map(x => x.status),
        datasets: [{
          label: '',
          data: dataObj.labels.map(x => x.count),
          backgroundColor: dataObj.labels.map(x => x.color),

          // AQUI: Removemos a borda branca entre as fatias
          borderWidth: 0,
          borderColor: 'transparent',
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true, // Mudei para true para respeitar o flexbox do pai se necessário
        maintainAspectRatio: false, // Importante para esticar no layout
        animation: { duration: 0 },

        plugins: {
          legend: { display: false }, // Remove legenda nativa
          title: { display: false },
          tooltip: { enabled: true },

          // AQUI: Configuração explícita para matar as linhas e textos
          datalabels: {
            display: false,
            anchor: 'end',
            align: 'start',
            offset: 0
          },
          outlabels: {
            display: false
          }
        },

        // AQUI: Garante que não tenha eixos (padrão em pizza, mas bom garantir)
        scales: {
          x: { display: false },
          y: { display: false }
        },

        // AQUI: Configuração global de elementos para remover bordas
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      },
    };

    this.charts[chartKey] = new Chart(ctx, config);
  }

  // --- Helpers ---

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

  incrementStatusCount(status: string, obj: string) {
    const label = this[obj].labels.find(label => label.status === status);
    if (label) label.count++;
  }

  returnRange7Days() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return {
      fromDate: this.formatDate(sevenDaysAgo),
      toDate: this.formatDate(currentDate)
    };
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  }
}