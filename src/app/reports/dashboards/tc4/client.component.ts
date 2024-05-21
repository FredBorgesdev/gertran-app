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



  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private positionService: PositionsService,
    private service: MonitoringRequestsService,
    private reportsService: ReportsService,

  ) { }

  ngOnInit() {
    this.loadPositions();
    this.loadMonitoringRequests()
    this.loadCheckLists()
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
    const queryParams = new URLSearchParams(window.location.search);
    const customer =
      queryParams.get('customerId') ||
      this.customerId ||
      this.authService.customerId;

    this.positionService
      .getAll({ limit: 999 }, { customer, travelling: true, })
      .subscribe(async (data) => {
        this.positionsData.totalPositionsMonitoring = data.results.length


        const operations = data.results.map(x => x.monitoringRequest.operation)


        const operationCounts = operations.reduce((acc, curr) => {
          if (curr && curr.name != null) {
            const name = curr.name;
            acc[name] = (acc[name] || 0) + 1;
          }
          return acc;
        }, {});




        const colors = ['red', 'blue', 'yellow', 'green', 'brown']; // Array of colors

        const newArray = Object.keys(operationCounts).map((name, index) => ({
          status: name,
          count: operationCounts[name],
          color: colors[index % colors.length] // Assign color based on index
        }));


        
        // const newArray = Object.keys(operationCounts).map(name => ({
        //   status: name,
        //   count: operationCounts[name]
        // }));


        this.operationsPositionsData.labels = newArray

        this.operationsPositionsData.totalOperationsPositionsData = operations.length


        const config2 = this.createConfigChart(
          this.operationsPositionsData.labels.map(x => x.status),
          this.operationsPositionsData.labels.map(x => x.count),
          this.operationsPositionsData.labels.map(x => x.color)
        )

        const ctx2 = document.getElementById('operationsPositionsChart') as HTMLCanvasElement;
        new Chart(ctx2, config2);



        data.results.forEach(item => {
          switch (item.monitoringRequest.travelStatus) {
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



        const config = this.createConfigChart(
          this.positionsData.labels.map(x => x.status),
          this.positionsData.labels.map(x => x.count),
          this.positionsData.labels.map(x => x.color)
        )

        const ctx = document.getElementById('positonsChart') as HTMLCanvasElement;
        new Chart(ctx, config);
      });
  }

  loadCheckLists() {
    const queryParams = new URLSearchParams(window.location.search);

    const customer = queryParams.get('customerId') ||
      this.customerId ||
      this.authService.customerId;

    const { fromDate, toDate } = this.returnRange7Days()

    this.reportsService.getChecklistHistory({
      customer,
      from: fromDate,
      to: toDate,
      plate: ''
    }).subscribe(response => {
      this.checkListsData.totalCheckLists = response.length

      // const approved = response.filter(x => x.status === 'approved')
      // const reproved = response.filter(x => x.status === 'reproved')
      // const requested = response.filter(x => x.status === 'requested')

      // const newData = [
      //   requested.length,
      //   approved.length,
      //   reproved.length,
      // ];



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



      const config = this.createConfigChart(
        this.checkListsData.labels.map(x => x.status),
        this.checkListsData.labels.map(x => x.count),
        this.checkListsData.labels.map(x => x.color)
      )

      const ctx = document.getElementById('checkListChart') as HTMLCanvasElement;
      new Chart(ctx, config);
    });
  }

  loadMonitoringRequests() {
    const queryParams = new URLSearchParams(window.location.search);

    const { fromDate, toDate } = this.returnRange7Days()

    const customer = queryParams.get('customerId') ||
      this.customerId ||
      this.authService.customerId;

    this.service
      .getAll({ limit: 999 }, { customer: customer, fromDate: fromDate, toDate: toDate })
      .subscribe((result) => {

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



        this.monitoringRequestsData.totalMonitoringRequests = result.results.length

        const config = this.createConfigChart(
          this.monitoringRequestsData.labels.map(x => x.status),
          this.monitoringRequestsData.labels.map(x => x.count),
          this.monitoringRequestsData.labels.map(x => x.color)
        )

        const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
        new Chart(ctx, config);


        const operationCounts = result.results.reduce((acc, curr) => {
          if (curr.operation && curr.operation.name != null) {
            const name = curr.operation.name;
            acc[name] = (acc[name] || 0) + 1;
          }
          return acc;
        }, {});


        const colors = ['red', 'blue', 'yellow', 'green', 'brown']; // Array of colors

        const newArray = Object.keys(operationCounts).map((name, index) => ({
          status: name,
          count: operationCounts[name],
          color: colors[index % colors.length] // Assign color based on index
        }));

        this.operationsData.labels = newArray


        const config4 = this.createConfigChart(
          this.operationsData.labels.map(x => x.status),
          this.operationsData.labels.map(x => x.count),
          this.operationsData.labels.map(x => x.color)
        )

        this.operationsData.totalOperations = result.results.length

        const ctx4 = document.getElementById('myChart4') as HTMLCanvasElement;
        new Chart(ctx4, config4);
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard', 'home']);
  }

  toggleFullscreen(): void {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        // c/onsole.log(`Erro ao tentar entrar em tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  goToTowerControl1(): void {
    this.router.navigate(['reports', 'dashboards', 'tc1'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl2(): void {
    this.router.navigate(['reports', 'dashboards', 'tc2'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl3(): void {
    this.router.navigate(['reports', 'dashboards', 'tc3'], { queryParams: { fullscreen: 'true' } });
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
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}

