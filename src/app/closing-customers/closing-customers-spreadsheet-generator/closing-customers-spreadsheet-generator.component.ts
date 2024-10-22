import { Component, OnInit } from "@angular/core";
import { ClosingCustomersService } from "../closing-customers.service";

@Component({
  selector: 'app-closing-customers-spreadsheet-generator',
  templateUrl: './closing-customers-spreadsheet-generator.component.html',
  styleUrls: ['./closing-customers-spreadsheet-generator.component.css']
})
export class ClosingCustomerSpreadSheetGeneratorComponent implements OnInit {
  
  // Propriedade para armazenar os clientes e suas placas
  groupedCustomers: any = {};

  constructor(
    private closingCustomersService: ClosingCustomersService
  ) { }

  ngOnInit(): void {
    this.closingCustomersService.getAll({}, {
      closing_day: '10',
      start_date: '2024-09-01',
      end_date: '2024-09-29'
    }).toPromise().then((response: any[]) => {
      // Agrupar placas por cliente (trading_name)

      this.groupedCustomers = response.reduce((acc, item) => {
        const customerName = item.tradingName;
      //   // Se o cliente não existe no acumulador, inicializar com uma lista vazia
        if (!acc[customerName]) {
          acc[customerName] = [];
        }
        
      //   // Adicionar a placa à lista do cliente
        acc[customerName].push({plate: item.plate, tracker_technology: item.trackerTechnology});
        return acc;
      }, {});

      // Ver resultado no console
      console.log(this.groupedCustomers);
    });
  }
}
