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

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-monthly-report-select',
  templateUrl: './monthly-report-select.component.html',
  styleUrls: ['./monthly-report-select.component.css'],
})
export class MonthlyReportSelectComponent implements OnInit {
  currentMonthName: string = '';
  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


  yearMonthOptions: YearMonthOption[] = [];
  selectedOption?: YearMonthOption;
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
  smPerTechnologyCurrentMonthBar: { labels: any; datasets: { label: string; data: any; backgroundColor: string; borderColor: string; borderWidth: number; }[]; };
  smPerTechnologyBarCurrentMonth: { labels: any; datasets: { label: string; data: any; backgroundColor: string; borderColor: string; borderWidth: number; }[]; };

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

  searchWorkerPercentPieData: any
  searchWorkerList: { label: string; total: number; percentage: number; color: string }[] = [];

  searchWorkerCurrentMonthPercentPieData: any
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
    this.loadYearMonthOptions();

    const headers = document.getElementsByClassName('header')
    window.onbeforeprint = () => {
      Array.from(headers).forEach(h => (h as HTMLElement).style.display = 'none');
    };

    // Depois de imprimir
    window.onafterprint = () => {
      Array.from(headers).forEach(h => (h as HTMLElement).style.display = '');
    };

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

  onYearMonthChange() {
    if (this.selectedOption) {
      this.loadReports(this.selectedOption.year, this.selectedOption.month);
    }
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

  loadReports(year: number, month: number) {
    this.monthlyReportService.getByYearMonth(year, month, this.pagination).subscribe({
      next: (response: GetAllResponse<MonthlyReport>) => {
        this.currentMonthName = this.monthNames[month - 1]; // month vem de 1 a 12
        this.reports = response.results;

        const report = this.reports[0] || {} as MonthlyReport;
        this.customerName = report.customer?.tradingName

        this.totalSm = report.totalSm || 0;
        this.totalSmCurrentMonth = report.totalSmCurrentMonth || 0;

        this.totalNc = report.totalNc || 0;
        this.totalNcCurrentMonth = report.totalNcCurrentMonth || 0;

        this.smPerOperationsPiePercentChartOptions = this.smOperationsHelper.chartOptions;
        this.smPerMonthlineChartOptions = this.smPerMonthHelper.chartOptions;
        this.smPerTechnologyBarOptions = this.smPerTechnologyHelper.chartOptions;
        this.ncIncidentPieOptions = this.ncIncidentHelper.chartOptions;
        this.vehiclesPerMonthLineOptions = this.vehiclesPerMonthLineHelper.chartOptions;

        // do começo do ano
        this.smPerMonthline = this.smPerMonthHelper.build(report);
        this.smPerOperationsPiePercent = this.smOperationsHelper.build(report.totalSmPerOperationsPercent);
        this.smPerOperationsList = this.smPerOperationsListHelper.build(report.totalSmPerOperationsPercent)
        this.smPerTechnologyBar = this.smPerTechnologyHelper.build(report.totalSmPerTechnologyPercent);
        this.smDriverList = this.smDriverHelper.build(report.totalSmPerDriver);
        this.smRouteOriginList = this.smRouteOriginHelper.build(report.totalSmPerRouteOrigin);
        this.smRouteDestinyList = this.smRouteDestinyHelper.build(report.totalSmPerRouteDestiny);
        this.vehiclesPerMonthLineData = this.vehiclesPerMonthLineHelper.build(report.totalVehiclesPerMonth);

        this.ncIncidentPiePercent = this.ncIncidentHelper.build(report.totalNcPerIncidentPercent);
        this.ncIncidentList = this.ncIncidentHelperList.build(report.totalNcPerIncidentPercent);
        this.ncPerDriverList = this.ncPerDriverListHelper.build(report.totalNcPerDrivers);

        //mes atual
        this.smPerOperationsPiePercentCurrentMonth = this.smOperationsHelper.build(report.totalSmCurrentMonthPerOperationsPercent)
        this.smPerOperationsPiePercentCurrentMonthList = this.smPerOperationsListHelper.build(report.totalSmCurrentMonthPerOperationsPercent)
        this.smPerTechnologyBarCurrentMonth = this.smPerTechnologyHelper.build(report.totalSmCurrentMonthPerTechnologyPercent);
        this.smDriverCurrentMonthList = this.smDriverHelper.build(report.totalSmCurrentMonthPerDriver);
        this.smRouteOriginCurrentMonthList = this.smRouteOriginHelper.build(report.totalSmCurrentMonthPerRouteOrigin);
        this.smRouteDestinyCurrentMonthList = this.smRouteDestinyHelper.build(report.totalSmCurrentMonthPerRouteDestiny);

        this.ncIncidentPiePercentCurrentMonth = this.ncIncidentHelper.build(report.totalNcCurrentMonthPerIncidentPercent);
        this.ncIncidentCurrentMonthList = this.ncIncidentHelperList.build(report.totalNcCurrentMonthPerIncidentPercent);
        this.ncPerDriverCurrentMonthList = this.ncPerDriverListHelper.build(report.totalNcCurrentMonthPerDrivers);

        this.pieChartData = this.loadTypeHelper.build(report);
        this.pieChartOptions = this.loadTypeHelper.chartOptions;

        this.ncPerMonthLineData = this.ncPerMonthLineHelper.build(report);
        this.ncPerMonthLineOptions = this.ncPerMonthLineHelper.chartOptions;

        this.smRouteOriginPieData = this.totalSmPerRouteOriginPercentHelper.build(report);
        this.smRouteOriginPieOptions = this.totalSmPerRouteOriginPercentHelper.chartOptions;

        this.smRouteDestinyPieData = this.totalSmPerRouteDestinyPercentHelper.build(report);
        this.smRouteDestinyPieOptions = this.totalSmPerRouteDestinyPercentHelper.chartOptions;

        this.smPerLoadTypeList = this.smPerLoadTypeListHelper.build(report);

        this.ncPerPlatesList = this.ncPerPlatesHelperList.build(report);

        this.smPerPlatesPercentList = this.totalSmPerPlatesPercentListHelper.build(report);

        this.ncOverSpeedDriverList = this.ncOverSpeedDriverListHelper.build(report.totalNcPerDrivers);

        const summedSearch = this.sumSearchPercent(JSON.parse(report.totalSearchPercent));

        this.searchPieOptions = this.searchHelper.chartOptions;
        this.searchWorkerPieOptions = this.searchWorkerPercentHelper.chartOptions;

        this.searchPieData = this.searchHelper.build(summedSearch);
        this.searchList = this.searchListHelper.build(summedSearch)

        this.searchCurrentMonthPieData = this.searchHelper.build(JSON.parse(report.totalSearchCurrentMonthPercent)[0]);
        this.searchCurrentMonthList = this.searchListHelper.build(JSON.parse(report.totalSearchCurrentMonthPercent)[0]);

        this.searchWorkerPercentPieData = this.searchWorkerPercentHelper.build(summedSearch)
        this.searchWorkerList = this.searchWorkerListHelper.build(summedSearch)

        this.searchWorkerCurrentMonthPercentPieData = this.searchWorkerPercentHelper.build(JSON.parse(report.totalSearchCurrentMonthPercent)[0])
        this.searchWorkerCurrentMonthList = this.searchWorkerListHelper.build(JSON.parse(report.totalSearchCurrentMonthPercent)[0])
      }
    });
  }
}

