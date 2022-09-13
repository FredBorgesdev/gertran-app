import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Tracker } from 'src/app/trackers/trackers-form/trackers-form.component';

import { TableService } from '../../shared/services/table.service';
import { trucksList } from './mocked-data';

export interface Truck {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  trackers: Tracker[];
}

@Component({
  selector: 'app-trucks-list',
  templateUrl: './trucks-list.component.html',
  styleUrls: [ './trucks-list.component.css' ]
})
export class TrucksListComponent implements OnInit {

  isLoading = false;
  displayData = [];
  searchInput: string;

  truckColumn = [
    {
      title: 'ID',
      compare: (
        a: Truck,
        b: Truck
      ) => a.id - b.id
    },
    {
      title: 'Placa',
      compare: (
        a: Truck,
        b: Truck
      ) => a.plate.localeCompare(b.plate)
    },
    {
      title: 'Marca',
      compare: (
        a: Truck,
        b: Truck
      ) => a.brand.localeCompare(b.brand)
    },
    {
      title: 'Modelo',
      compare: (
        a: Truck,
        b: Truck
      ) => a.model.localeCompare(b.model)
    },
    {
      title: 'Ações'
    }
  ];

  trucksList: Truck[] = trucksList;

  constructor(
    private router: Router,
    private tableService: TableService
  ) {
    this.isLoading = true;
    setTimeout(
      () => {
        this.isLoading = false;
        this.displayData = this.trucksList;
      },
      333
    );
  }

  ngOnInit(): void {
  }

  search() {
    const data = this.trucksList;
    this.displayData = this.tableService.search(
      this.searchInput,
      data
    );
  }

  create() {
    this.router.navigate([ '/trucks/truck-create' ]);
  }

  edit(item: Truck) {
    this.router.navigate([
      '/trucks/truck-edit',
      item.id
    ]);
  }

}
