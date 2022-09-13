import { Component, Input, OnInit } from '@angular/core';
import { Stop } from '../stops-list/stops-list.component';

@Component({
  selector: 'app-stops-working-hours',
  templateUrl: './stops-working-hours.component.html',
  styleUrls: ['./stops-working-hours.component.css']
})
export class StopsWorkingHoursComponent implements OnInit {
  tabs = [
    {
      key: 'sunday',
      label: 'Domingo'
    },
    {
      key: 'monday',
      label: 'Segunda-feira'
    },
    {
      key: 'tuesday',
      label: 'Terça-feira'
    },
    {
      key: 'wednesday',
      label: 'Quarta-feira'
    },
    {
      key: 'thursday',
      label: 'Quinta-feira'
    },
    {
      key: 'friday',
      label: 'Sexta-feira'
    },
    {
      key: 'saturday',
      label: 'Sábado'
    }
  ];

  @Input() stop: Stop;

  constructor() { }

  ngOnInit(): void {
  }

}
