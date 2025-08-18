import { Component, OnInit } from '@angular/core';
import { MonthlyReportService, YearMonthOption, MonthlyReport } from '../monthly_report.service';
import { GetAllResponse, Pagination } from 'src/app/shared/services/api.service';
import { TotalSmPerOperationsPercentHelper } from '../chart-helpers/total-sm-per-operations-percent.helper';
import { TotalSmPerLoadTypePercentHelper } from '../chart-helpers/total-sm-per-load-type-percent.helper';
import { TotalSmPerMonthLineHelper } from '../chart-helpers/total-sm-per-month-line.helper';
import { TotalNcPerIncidentPercentHelper } from '../chart-helpers/total-nc-per-incident-percent.helper';
import { TotalNcPerMonthLineHelper } from '../chart-helpers/total-nc-per-month-line.helper';
import { TotalSmPerTechnologyPercentHelper } from '../chart-helpers/total-sm-per-technology-percent.helper';
import { TotalSmPerPlatePercentHelper } from '../chart-helpers/total-sm-per-plate-percent';
import { NcIncidentListHelper } from '../chart-helpers/total-nc-incident-list-helper';
import { SmRouteDestinyListHelper } from '../chart-helpers/total-route-destiny-list-helper';
import { SmRouteOriginListHelper } from '../chart-helpers/total-route-origin-list-helper';
import { SmDriverListHelper } from '../chart-helpers/total-sm-driver-list-helper';
import { SmPerOperationsListHelper } from '../chart-helpers/total-sm-per-operations-list-helper';
import { TotalSmPerRouteOriginPercentHelper } from '../chart-helpers/total-sm-route-origin-percent';
import { TotalSmPerRouteDestinyPercentHelper } from '../chart-helpers/total-sm-per-route-destiny-percent.helper';
// import { Chart, registerables } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-monthly-report-select',
  templateUrl: './monthly-report-select.component.html',
  styleUrls: ['./monthly-report-select.component.css'],
})
export class MonthlyReportSelectComponent implements OnInit {
  yearMonthOptions: YearMonthOption[] = [];
  selectedOption?: YearMonthOption;
  reports: MonthlyReport[] = [];
  pagination: Pagination = { limit: 10 };
  ncIncidentList: { label: string; total: number; percentage: number }[] = [];
  smPerOperationsList: { label: string; total: number; percentage: number }[] = [];


  
  smRouteOriginList: { label: string; total: number; percentage: number }[] = [];
  smRouteDestinyList: { label: string; total: number; percentage: number }[] = [];
  smDriverList: { Motorista: string; VeiculoAutomotor: string; QuantidadeDeViagens: number }[] = [];

  // cada gráfico com seu data/options
  barChartData: any;
  barChartOptions: any;

  pieChartData: any;
  pieChartOptions: any;

  lineChartData: any;
  lineChartOptions: any;

  ncIncidentPieData: any;
  ncIncidentPieOptions: any;

  ncPerMonthLineData: any;
  ncPerMonthLineOptions: any;

  smPerTechnologyBarData: any;
  smPerTechnologyBarOptions: any;

  smPerPlateBarLineData: any;
  smPerPlateBarLineOptions: any;

  smRouteOriginPieData: any;
  smRouteOriginPieOptions: any;


  smRouteDestinyPieData: any;
  smRouteDestinyPieOptions: any;

  constructor(
    private monthlyReportService: MonthlyReportService,
    private smOperationsHelper: TotalSmPerOperationsPercentHelper,
    private loadTypeHelper: TotalSmPerLoadTypePercentHelper,
    private smPerMonthHelper: TotalSmPerMonthLineHelper,
    private ncIncidentHelper: TotalNcPerIncidentPercentHelper,
    private ncPerMonthLineHelper: TotalNcPerMonthLineHelper,
    private smPerTechnologyHelper: TotalSmPerTechnologyPercentHelper,
    private smPerPlateBarLineHelper: TotalSmPerPlatePercentHelper,
    private ncIncidentHelperList: NcIncidentListHelper,
    private smRouteDestinyHelper: SmRouteDestinyListHelper,
    private smRouteOriginHelper: SmRouteOriginListHelper,
    private smDriverHelper: SmDriverListHelper,
    private smPerOperationsListHelper: SmPerOperationsListHelper,
    private totalSmPerRouteOriginPercentHelper: TotalSmPerRouteOriginPercentHelper,
    private totalSmPerRouteDestinyPercentHelper: TotalSmPerRouteDestinyPercentHelper,
  ) { }

  ngOnInit() {
    this.loadYearMonthOptions();
    // Chart.register(...registerables, ChartDataLabels);

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

  loadReports(year: number, month: number) {
    this.monthlyReportService.getByYearMonth(year, month, this.pagination).subscribe({
      next: (response: GetAllResponse<MonthlyReport>) => {
        this.reports = response.results;
        const report = this.reports[0] || {} as MonthlyReport;

        this.barChartData = this.smOperationsHelper.build(report);
        this.barChartOptions = this.smOperationsHelper.chartOptions;

        this.pieChartData = this.loadTypeHelper.build(report);
        this.pieChartOptions = this.loadTypeHelper.chartOptions;

        this.smPerOperationsList = this.smPerOperationsListHelper.build(report)


        this.lineChartData = this.smPerMonthHelper.build(report);
        this.lineChartOptions = this.smPerMonthHelper.chartOptions;

        this.ncIncidentPieData = this.ncIncidentHelper.build(report);
        this.ncIncidentPieOptions = this.ncIncidentHelper.chartOptions;

        this.ncIncidentList = this.ncIncidentHelperList.build(report);

        this.smRouteOriginList = this.smRouteOriginHelper.build(report);
        this.smRouteDestinyList = this.smRouteDestinyHelper.build(report);

        this.smDriverList = this.smDriverHelper.build(report);


        this.ncPerMonthLineData = this.ncPerMonthLineHelper.build(report);
        this.ncPerMonthLineOptions = this.ncPerMonthLineHelper.chartOptions;

        this.smPerTechnologyBarData = this.smPerTechnologyHelper.build(report);
        this.smPerTechnologyBarOptions = this.smPerTechnologyHelper.chartOptions;

        this.smPerPlateBarLineData = this.smPerPlateBarLineHelper.build(report);
        this.smPerPlateBarLineOptions = this.smPerPlateBarLineHelper.chartOptions;



        this.smRouteOriginPieData = this.totalSmPerRouteOriginPercentHelper.build(report);
        this.smRouteOriginPieOptions = this.totalSmPerRouteOriginPercentHelper.chartOptions;


        this.smRouteDestinyPieData = this.totalSmPerRouteDestinyPercentHelper.build(report);
        this.smRouteDestinyPieOptions = this.totalSmPerRouteDestinyPercentHelper.chartOptions;
      }
    });
  }
}

