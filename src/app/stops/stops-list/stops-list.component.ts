import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stopsList, stopsListTypeCategories, stopsListTypes } from './mocked-data';

export interface Stop {
  id?: number;
  name: string;
  description: string;
  address: string;
  state: string;
  city: string;
  lat?: number;
  lng?: number;
  radius: number;
  typeId: number;
  typeCategoryIds: number[];
  workingHours?: {
    [key: string]: {
      start: string
      end: string
      fullDay: boolean
      expectedG2g: string
      hiredG2g: string
      checkedG2g: string
    }
  };
}

@Component({
  selector: 'app-stops-list',
  templateUrl: './stops-list.component.html',
  styleUrls: ['./stops-list.component.css']
})
export class StopsListComponent implements OnInit {
  isLoading = false;

  stopsList: Stop[] = [];
  stopsListTypes = stopsListTypes;
  stopsListTypeCategories = stopsListTypeCategories;

  searchInput = '';

  stopColumns = [
    {
      title: 'ID',
      compare: (
        a: Stop,
        b: Stop
      ) => a.id - b.id
    },
    {
      title: 'Nome',
      compare: (
        a: Stop,
        b: Stop
      ) => a.name.localeCompare(b.name)
    },
    {
      title: 'Descrição',
      compare: (
        a: Stop,
        b: Stop
      ) => a.description.localeCompare(b.description)
    },
    {
      title: 'Endereço',
      compare: (
        a: Stop,
        b: Stop
      ) => a.address.localeCompare(b.address)
    },
    { title: 'Raio' },
    { title: 'Tipo' },
    { title: 'Ações' },
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.stopsList = stopsList;
      this.isLoading = false;
    }, 333);
  }

  getStopTypeName(id: number) {
    return this.stopsListTypes.find(type => type.id === id)?.name;
  }

  create() {
    this.router.navigate(['/stops', 'stop-create']);
  }

  edit(stop: Stop) {
    this.router.navigate(['/stops', 'stop-edit', stop.id]);
  }
}
