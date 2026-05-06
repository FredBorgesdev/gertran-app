import { Component, OnInit } from '@angular/core';
import { MonthlyReportService, YearMonthOption, MonthlyReport } from '../monthly_report.service';
import { GetAllResponse, Pagination } from 'src/app/shared/services/api.service';
import { TotalSmPerOperationsPercentHelper } from '../chart-helpers/total-sm-per-operations-percent.helper';
import { TotalSmPerLoadTypePercentHelper } from '../chart-helpers/total-sm-per-load-type-percent.helper';
import { TotalSmPerMonthLineHelper } from '../chart-helpers/total-sm-per-month-line.helper';
import { TotalNcPerIncidentPercentHelper } from '../chart-helpers/total-nc-per-incident-percent.helper';
import { TotalNcPerMonthLineHelper } from '../chart-helpers/total-nc-per-month-line.helper';
import { TotalSmPerTechnologyPercentHelper } from '../chart-helpers/total-sm-per-technology-percent.helper';
import { NcIncidentListHelper } from '../chart-helpers/total-nc-incident-list-helper';
import { SmRouteDestinyListHelper } from '../chart-helpers/total-route-destiny-list-helper';
import { SmRouteOriginListHelper } from '../chart-helpers/total-route-origin-list-helper';
import { SmDriverListHelper } from '../chart-helpers/total-sm-driver-list-helper';
import { SmPerOperationsListHelper } from '../chart-helpers/total-sm-per-operations-list-helper';
import { TotalSmPerRouteOriginPercentHelper } from '../chart-helpers/total-sm-route-origin-percent';
import { TotalSmPerRouteDestinyPercentHelper } from '../chart-helpers/total-sm-per-route-destiny-percent.helper';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SmPerLoadTypeListHelper } from '../chart-helpers/total-sm-per-load-type-list.helper';
import { NcPerPlatesListHelper } from '../chart-helpers/total-nc-per-plates-list-helper';
import { NcPerDriverItem, NcPerDriverListHelper } from '../chart-helpers/nc-per-driver-list.helper';
import { TotalSmPerPlatesPercentListHelper } from '../chart-helpers/total-sm-per-plates-list.helper';
import { VehiclesPerMonthLineHelper } from '../chart-helpers/vehicles_per_month_line_helper';
import { NcOverSpeedDriverItem, NcOverSpeedDriverListHelper } from '../chart-helpers/nc-over-speed-driver-list.helper';
import { TotalSearchPercentHelper } from '../chart-helpers/total-search-percent.helper';
import { SearchListHelper } from '../chart-helpers/search-list-helper';
import { SearchWorkerListHelper } from '../chart-helpers/search-worker-list.helper';
import { SearchWorkerPercentHelper } from '../chart-helpers/search-worker-percent.helper';
import { forkJoin } from 'rxjs';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-monthly-report-print-layout', // <-- Note que o seletor é diferente
  templateUrl: './monthly-report-print-layout.html', // <-- Aponta pro HTML de impressão
  styleUrls: ['./monthly-report-print-layout.css'], // <-- Aponta pro CSS de impressão
})
export class MonthlyReportPrintLayoutComponent implements OnInit {
  currentMonthName: string = '';
  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  yearMonthOptions: YearMonthOption[] = [];
  selectedOption?: YearMonthOption;
  periodOptions: number[] = [1, 3, 6, 9];
  selectedPeriodMonths: number = 3;
  reports: MonthlyReport[] = [];
  pagination: Pagination = { limit: 10 };

  ncIncidentList: { label: string; total: number; percentage: number }[] = [];
  smPerOperationsList: { label: string; total: number; percentage: number }[] = [];
  ncPerPlatesList: { label: string; total: number; percentage: number; color: string }[] = [];
  smPerPlatesPercentList: { placa: string; total: number; percentage: number }[] = [];
  ncPerDriverList: NcPerDriverItem[] = [];
  ncPerDriverCurrentMonthList: NcPerDriverItem[] = [];
  smRouteOriginList: { label: string; total: number; percentage: number }[] = [];
  smRouteDestinyList: { label: string; total: number; percentage: number }[] = [];
  smRouteOriginCurrentMonthList: { label: string; total: number; percentage: number }[] = [];
  smRouteDestinyCurrentMonthList: { label: string; total: number; percentage: number }[] = [];
  smDriverList: { Motorista: string; VeiculoAutomotor: string; QuantidadeDeViagens: number }[] = [];
  smPerLoadTypeList: { label: string; total: number; percentage: number; color: string }[] = [];
  smDriverCurrentMonthList: { Motorista: string; VeiculoAutomotor: string; QuantidadeDeViagens: number }[] = [];

  smPerOperationsPiePercent: any;
  smPerOperationsPiePercentChartOptions: any;
  smPerOperationsPiePercentCurrentMonthList: any;
  pieChartData: any;
  pieChartOptions: any;
  lineChartData: any;
  lineChartOptions: any;
  ncIncidentPiePercent: any;
  ncIncidentPieOptions: any;
  ncPerMonthLineData: any;
  ncPerMonthLineOptions: any;
  smPerTechnologyBar: any;
  smPerTechnologyBarOptions: any;
  smPerPlateBarLineData: any;
  smPerPlateBarLineOptions: any;
  smRouteOriginPieData: any;
  smRouteOriginPieOptions: any;
  smRouteDestinyPieData: any;
  smRouteDestinyPieOptions: any;
  ncPerDriverBarData: any;
  ncPerDriverBarOptions: any;

  totalSm: Number = 0;
  totalSmCurrentMonth: Number = 0;
  totalNcCurrentMonth: Number = 0;
  totalNc: number = 0;

  smPerOperationsPiePercentCurrentMonth: any;
  smPerMonthline: any;
  smPerMonthlineChartOptions: any;
  smPerTechnologyCurrentMonthBar: any;
  smPerTechnologyBarCurrentMonth: any;
  ncIncidentPiePercentCurrentMonth: any;
  ncIncidentCurrentMonthList: any;
  vehiclesPerMonthLineData: any;
  vehiclesPerMonthLineOptions: any;
  ncOverSpeedDriverList: NcOverSpeedDriverItem[] = [];

  searchPieOptions: any;
  searchWorkerPieOptions: any;
  searchPieData: any;
  searchList: { label: string; total: number; percentage: number; color: string }[] = [];
  searchCurrentMonthPieData: any;
  searchCurrentMonthList: { label: string; total: number; percentage: number; color: string }[] = [];
  searchWorkerPercentPieData: any;
  searchWorkerList: { label: string; total: number; percentage: number; color: string }[] = [];
  searchWorkerCurrentMonthPercentPieData: any;
  searchWorkerCurrentMonthList: { label: string; total: number; percentage: number; color: string }[] = [];

  customerName: string = '';

  constructor(
    private monthlyReportService: MonthlyReportService,
    private smOperationsHelper: TotalSmPerOperationsPercentHelper,
    private loadTypeHelper: TotalSmPerLoadTypePercentHelper,
    private smPerMonthHelper: TotalSmPerMonthLineHelper,
    private ncIncidentHelper: TotalNcPerIncidentPercentHelper,
    private ncPerMonthLineHelper: TotalNcPerMonthLineHelper,
    private smPerTechnologyHelper: TotalSmPerTechnologyPercentHelper,
    private ncIncidentHelperList: NcIncidentListHelper,
    private smRouteDestinyHelper: SmRouteDestinyListHelper,
    private smRouteOriginHelper: SmRouteOriginListHelper,
    private smDriverHelper: SmDriverListHelper,
    private smPerOperationsListHelper: SmPerOperationsListHelper,
    private totalSmPerRouteOriginPercentHelper: TotalSmPerRouteOriginPercentHelper,
    private totalSmPerRouteDestinyPercentHelper: TotalSmPerRouteDestinyPercentHelper,
    private smPerLoadTypeListHelper: SmPerLoadTypeListHelper,
    private ncPerPlatesHelperList: NcPerPlatesListHelper,
    private ncPerDriverListHelper: NcPerDriverListHelper,
    private totalSmPerPlatesPercentListHelper: TotalSmPerPlatesPercentListHelper,
    private vehiclesPerMonthLineHelper: VehiclesPerMonthLineHelper,
    private ncOverSpeedDriverListHelper: NcOverSpeedDriverListHelper,
    private searchHelper: TotalSearchPercentHelper,
    private searchListHelper: SearchListHelper,
    private searchWorkerPercentHelper: SearchWorkerPercentHelper,
    private searchWorkerListHelper: SearchWorkerListHelper
  ) { }

  ngOnInit() {
    // Busca na URL os parâmetros que foram passados na tela web
    const urlParams = new URLSearchParams(window.location.search);
    const selectedYear = urlParams.get('year');
    const selectedMonth = urlParams.get('month');
    const selectedPeriod = urlParams.get('period');

    if (selectedYear && selectedMonth) {
      this.selectedPeriodMonths = selectedPeriod ? parseInt(selectedPeriod, 10) : 3;

      // Simula a escolha para carregar os relatórios certos
      this.selectedOption = { year: parseInt(selectedYear, 10), month: parseInt(selectedMonth, 10) };
      this.loadReports(this.selectedOption.year, this.selectedOption.month);
    } else {
      this.loadYearMonthOptions();
    }
  }

  loadYearMonthOptions() {
    this.monthlyReportService.getYearMonthOptions().subscribe({
      next: (options) => {
        this.yearMonthOptions = options;
        if (options.length) {
          this.selectedOption = options[0];
          this.loadReports(this.selectedOption.year, this.selectedOption.month);
        }
      }
    });
  }

  getPeriodLabel(period: number): string {
    if (period === 1) return 'Último mês';
    return `Últimos ${period} meses`;
  }

  sumSearchPercent(data: any[]): any {
    return data.reduce((acc, item) => {
      for (const key in item) {
        if (typeof item[key] === 'number') {
          acc[key] = (acc[key] || 0) + item[key];
        }
      }
      return acc;
    }, {});
  }

  private parseJsonValue<T>(value: any, fallback: T): T {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'string') {
      try { return JSON.parse(value) as T; } catch { return fallback; }
    }
    if (typeof value === 'object') return value as T;
    return fallback;
  }

  private toNumber(value: any): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private yearMonthKey(year: number, month: number): string {
    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  private mergeTotals(source: any, target: Record<string, number>, totalPropName: string = 'Total') {
    Object.entries(source || {}).forEach(([label, obj]: [string, any]) => {
      target[label] = (target[label] || 0) + this.toNumber(obj?.[totalPropName] ?? obj?.total ?? obj?.Quantidade ?? 0);
    });
  }

  private buildPercentObjectFromTotals(totals: Record<string, number>): any {
    const totalGeral = Object.values(totals).reduce((sum, value) => sum + value, 0);
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc: any, [label, total]) => {
        acc[label] = {
          Total: total,
          'Porcentagem (%)': totalGeral ? Number(((total / totalGeral) * 100).toFixed(2)) : 0,
        };
        return acc;
      }, {});
  }

  private buildPeriodReport(reports: MonthlyReport[]): MonthlyReport {
    if (!reports?.length) return {} as MonthlyReport;

    const sortedReports = [...reports].sort((a: any, b: any) => {
      if ((a.year || 0) !== (b.year || 0)) return (a.year || 0) - (b.year || 0);
      return (a.month || 0) - (b.month || 0);
    });

    const latest = sortedReports[sortedReports.length - 1] as any;
    const smPerMonth: Record<string, number> = {};
    const ncPerMonth: Record<string, number> = {};
    const vehiclesPerMonth: Record<string, number> = {};
    const smOperationsTotals: Record<string, number> = {};
    const smLoadTypeTotals: Record<string, number> = {};
    const smRouteOriginTotals: Record<string, number> = {};
    const smRouteDestinyTotals: Record<string, number> = {};
    const smPlatesTotals: Record<string, number> = {};
    const ncIncidentTotals: Record<string, number> = {};
    const ncPlatesTotals: Record<string, number> = {};
    const smTechnologyTotals: Record<string, number> = {};
    const smDriversMap: Record<string, any> = {};
    const ncDriversMap: Record<string, { total: number; ncs: Record<string, number> }> = {};

    const searchTotals: Record<string, number> = {
      total_consultas: 0, total_pesquisas: 0, total_vitimologias: 0, agregado: 0,
      ajudante: 0, ajudante_empregado: 0, ajudante_terceiro: 0, empregado: 0, terceiro: 0,
    };

    let totalSm = 0;
    let totalNc = 0;

    for (const item of sortedReports as any[]) {
      const year = this.toNumber(item.year);
      const month = this.toNumber(item.month);
      const key = this.yearMonthKey(year, month);
      const smCurrent = this.toNumber(item.totalSmCurrentMonth || 0);
      const ncCurrent = this.toNumber(item.totalNcCurrentMonth || 0);

      smPerMonth[key] = smCurrent;
      ncPerMonth[key] = ncCurrent;
      totalSm += smCurrent;
      totalNc += ncCurrent;

      const vehiclesObj = this.parseJsonValue<Record<string, number>>(item.totalVehiclesPerMonth, {});
      vehiclesPerMonth[key] = this.toNumber(vehiclesObj[key] || 0);

      this.mergeTotals(this.parseJsonValue(item.totalSmCurrentMonthPerOperationsPercent, {}), smOperationsTotals);
      this.mergeTotals(this.parseJsonValue(item.totalSmCurrentMonthPerLoadTypePercent, {}), smLoadTypeTotals);
      this.mergeTotals(this.parseJsonValue(item.totalSmCurrentMonthPerRouteOrigin, {}), smRouteOriginTotals);
      this.mergeTotals(this.parseJsonValue(item.totalSmCurrentMonthPerRouteDestiny, {}), smRouteDestinyTotals);
      this.mergeTotals(this.parseJsonValue(item.totalSmCurrentMonthPerPlatesPercent, {}), smPlatesTotals);
      this.mergeTotals(this.parseJsonValue(item.totalNcCurrentMonthPerIncidentPercent, {}), ncIncidentTotals);
      this.mergeTotals(this.parseJsonValue(item.totalNcCurrentMonthPerPlatesPercent, {}), ncPlatesTotals);

      const technologies = this.parseJsonValue<any[]>(item.totalSmCurrentMonthPerTechnologyPercent, []);
      technologies.forEach((tech) => {
        const label = tech?.Tecnologia || tech?.tecnologia;
        if (!label) return;
        smTechnologyTotals[label] = (smTechnologyTotals[label] || 0) + this.toNumber(tech?.Total ?? tech?.total ?? tech?.Quantidade ?? 0);
      });

      const smDrivers = this.parseJsonValue<any[]>(item.totalSmCurrentMonthPerDriver, []);
      smDrivers.forEach((driver) => {
        const motorista = driver?.Motorista || 'Sem motorista';
        const veiculo = driver?.['Veiculo Automotor'] || '';
        const driverKey = `${motorista}|${veiculo}`;
        if (!smDriversMap[driverKey]) {
          smDriversMap[driverKey] = { Motorista: motorista, 'Veiculo Automotor': veiculo, 'Quantidade de Viagens': 0 };
        }
        smDriversMap[driverKey]['Quantidade de Viagens'] += this.toNumber(driver?.['Quantidade de Viagens']);
      });

      const ncDrivers = this.parseJsonValue<Record<string, any>>(item.totalNcCurrentMonthPerDrivers, {});
      Object.entries(ncDrivers).forEach(([motorista, dados]: [string, any]) => {
        if (!ncDriversMap[motorista]) ncDriversMap[motorista] = { total: 0, ncs: {} };
        ncDriversMap[motorista].total += this.toNumber(dados?.total || 0);
        const ncs = dados?.ncs || {};
        Object.entries(ncs).forEach(([ncLabel, ncTotal]) => {
          ncDriversMap[motorista].ncs[ncLabel] = (ncDriversMap[motorista].ncs[ncLabel] || 0) + this.toNumber(ncTotal);
        });
      });

      const searchCurrent = this.parseJsonValue<any[]>(item.totalSearchCurrentMonthPercent, []);
      searchCurrent.forEach((entry) => {
        Object.keys(searchTotals).forEach((field) => {
          searchTotals[field] = (searchTotals[field] || 0) + this.toNumber(entry?.[field] || 0);
        });
      });
    }

    const technologiesList = Object.entries(smTechnologyTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([Tecnologia, Total]) => ({ Tecnologia, Total }));

    const smDriversList = Object.values(smDriversMap)
      .sort((a: any, b: any) => this.toNumber(b['Quantidade de Viagens']) - this.toNumber(a['Quantidade de Viagens']));

    return {
      ...(latest as MonthlyReport),
      totalSm, totalNc,
      totalSmPerMonth: JSON.stringify(smPerMonth),
      totalNcPerMonth: JSON.stringify(ncPerMonth),
      totalVehiclesPerMonth: JSON.stringify(vehiclesPerMonth),
      totalSmPerOperationsPercent: JSON.stringify(this.buildPercentObjectFromTotals(smOperationsTotals)),
      totalSmPerLoadTypePercent: JSON.stringify(this.buildPercentObjectFromTotals(smLoadTypeTotals)),
      totalSmPerRouteOrigin: JSON.stringify(this.buildPercentObjectFromTotals(smRouteOriginTotals)),
      totalSmPerRouteDestiny: JSON.stringify(this.buildPercentObjectFromTotals(smRouteDestinyTotals)),
      totalSmPerPlatesPercent: JSON.stringify(this.buildPercentObjectFromTotals(smPlatesTotals)),
      totalSmPerTechnologyPercent: JSON.stringify(technologiesList),
      totalSmPerDriver: JSON.stringify(smDriversList),
      totalNcPerIncidentPercent: JSON.stringify(this.buildPercentObjectFromTotals(ncIncidentTotals)),
      totalNcPerPlatesPercent: JSON.stringify(this.buildPercentObjectFromTotals(ncPlatesTotals)),
      totalNcPerDrivers: JSON.stringify(ncDriversMap),
      totalSearchPercent: JSON.stringify([searchTotals]),
    } as MonthlyReport;
  }

  private applyCharts(periodReport: MonthlyReport, currentReport: MonthlyReport) {
    this.totalSm = periodReport.totalSm || 0;
    this.totalSmCurrentMonth = currentReport.totalSmCurrentMonth || 0;
    this.totalNc = periodReport.totalNc || 0;
    this.totalNcCurrentMonth = currentReport.totalNcCurrentMonth || 0;

    this.smPerOperationsPiePercentChartOptions = this.smOperationsHelper.chartOptions;
    this.smPerMonthlineChartOptions = this.smPerMonthHelper.chartOptions;
    this.smPerTechnologyBarOptions = this.smPerTechnologyHelper.chartOptions;
    this.ncIncidentPieOptions = this.ncIncidentHelper.chartOptions;
    this.vehiclesPerMonthLineOptions = this.vehiclesPerMonthLineHelper.chartOptions;

    // Dados do Período
    this.smPerMonthline = this.smPerMonthHelper.build(periodReport);
    this.smPerOperationsPiePercent = this.smOperationsHelper.build(periodReport.totalSmPerOperationsPercent);
    this.smPerOperationsList = this.smPerOperationsListHelper.build(periodReport.totalSmPerOperationsPercent);
    this.smPerTechnologyBar = this.smPerTechnologyHelper.build(periodReport.totalSmPerTechnologyPercent);
    this.smDriverList = this.smDriverHelper.build(periodReport.totalSmPerDriver);
    this.smRouteOriginList = this.smRouteOriginHelper.build(periodReport.totalSmPerRouteOrigin);
    this.smRouteDestinyList = this.smRouteDestinyHelper.build(periodReport.totalSmPerRouteDestiny);
    this.vehiclesPerMonthLineData = this.vehiclesPerMonthLineHelper.build(periodReport.totalVehiclesPerMonth);
    this.ncIncidentPiePercent = this.ncIncidentHelper.build(periodReport.totalNcPerIncidentPercent);
    this.ncIncidentList = this.ncIncidentHelperList.build(periodReport.totalNcPerIncidentPercent);
    this.ncPerDriverList = this.ncPerDriverListHelper.build(periodReport.totalNcPerDrivers);
    this.pieChartData = this.loadTypeHelper.build(periodReport);
    this.pieChartOptions = this.loadTypeHelper.chartOptions;
    this.ncPerMonthLineData = this.ncPerMonthLineHelper.build(periodReport);
    this.ncPerMonthLineOptions = this.ncPerMonthLineHelper.chartOptions;
    this.smRouteOriginPieData = this.totalSmPerRouteOriginPercentHelper.build(periodReport);
    this.smRouteOriginPieOptions = this.totalSmPerRouteOriginPercentHelper.chartOptions;
    this.smRouteDestinyPieData = this.totalSmPerRouteDestinyPercentHelper.build(periodReport);
    this.smRouteDestinyPieOptions = this.totalSmPerRouteDestinyPercentHelper.chartOptions;
    this.smPerLoadTypeList = this.smPerLoadTypeListHelper.build(periodReport);
    this.ncPerPlatesList = this.ncPerPlatesHelperList.build(periodReport);
    this.smPerPlatesPercentList = this.totalSmPerPlatesPercentListHelper.build(periodReport);
    this.ncOverSpeedDriverList = this.ncOverSpeedDriverListHelper.build(periodReport.totalNcPerDrivers);

    // Dados do Mês Atual
    this.smPerOperationsPiePercentCurrentMonth = this.smOperationsHelper.build(currentReport.totalSmCurrentMonthPerOperationsPercent);
    this.smPerOperationsPiePercentCurrentMonthList = this.smPerOperationsListHelper.build(currentReport.totalSmCurrentMonthPerOperationsPercent);
    this.smPerTechnologyBarCurrentMonth = this.smPerTechnologyHelper.build(currentReport.totalSmCurrentMonthPerTechnologyPercent);
    this.smDriverCurrentMonthList = this.smDriverHelper.build(currentReport.totalSmCurrentMonthPerDriver);
    this.smRouteOriginCurrentMonthList = this.smRouteOriginHelper.build(currentReport.totalSmCurrentMonthPerRouteOrigin);
    this.smRouteDestinyCurrentMonthList = this.smRouteDestinyHelper.build(currentReport.totalSmCurrentMonthPerRouteDestiny);
    this.ncIncidentPiePercentCurrentMonth = this.ncIncidentHelper.build(currentReport.totalNcCurrentMonthPerIncidentPercent);
    this.ncIncidentCurrentMonthList = this.ncIncidentHelperList.build(currentReport.totalNcCurrentMonthPerIncidentPercent);
    this.ncPerDriverCurrentMonthList = this.ncPerDriverListHelper.build(currentReport.totalNcCurrentMonthPerDrivers);

    // Buscas
    const summedSearch = this.sumSearchPercent(this.parseJsonValue<any[]>(periodReport.totalSearchPercent, []));
    this.searchPieOptions = this.searchHelper.chartOptions;
    this.searchWorkerPieOptions = this.searchWorkerPercentHelper.chartOptions;
    this.searchPieData = this.searchHelper.build(summedSearch);
    this.searchList = this.searchListHelper.build(summedSearch);
    const currentSearch = this.parseJsonValue<any[]>(currentReport.totalSearchCurrentMonthPercent, [])[0] || {};
    this.searchCurrentMonthPieData = this.searchHelper.build(currentSearch);
    this.searchCurrentMonthList = this.searchListHelper.build(currentSearch);
    this.searchWorkerPercentPieData = this.searchWorkerPercentHelper.build(summedSearch);
    this.searchWorkerList = this.searchWorkerListHelper.build(summedSearch);
    this.searchWorkerCurrentMonthPercentPieData = this.searchWorkerPercentHelper.build(currentSearch);
    this.searchWorkerCurrentMonthList = this.searchWorkerListHelper.build(currentSearch);
  }

  loadReports(year: number, month: number) {
    forkJoin({
      period: this.monthlyReportService.getByPeriodWindow(year, month, this.selectedPeriodMonths, {
        limit: this.selectedPeriodMonths,
      }),
      current: this.monthlyReportService.getByYearMonth(year, month, { limit: 1 }),
    }).subscribe({
      next: ({ period, current }) => {
        this.currentMonthName = this.monthNames[month - 1];

        const periodReports = period?.results || [];
        const currentReport = (current?.results || [])[0] || ({} as MonthlyReport);
        const periodReport = this.buildPeriodReport(periodReports.length ? periodReports : [currentReport]);

        this.reports = periodReports;
        this.customerName = currentReport?.customer?.tradingName || periodReport?.customer?.tradingName || '';

        this.applyCharts(periodReport, currentReport);

        setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 250);
      },
    });
  }
}