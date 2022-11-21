import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../positions.service';
import {IncidentsService} from '../incidents.service';

@Component({
  selector: 'app-incidents-modal',
  templateUrl: './incidents-modal.component.html',
  styleUrls: ['./incidents-modal.component.css']
})
export class IncidentsModalComponent implements OnInit {
  @Input() position: Position;
  isLoading = false;
  incidentsColumns = [
    { title: 'Id' },
    { title: 'Viagem' },
    { title: 'Data' },
    { title: 'Criado por' },
    { title: 'Tipo' },
    { title: 'Descrição' },
    { title: 'Resolução' },
    { title: 'Status' },
    { title: 'Ações' }
  ];

  constructor(private service: IncidentsService) { }

  ngOnInit(): void {
  }

}
