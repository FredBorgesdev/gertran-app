import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Wagon} from '../wagons.service';

@Component({
  selector: 'app-wagons-form',
  templateUrl: './wagons-form.component.html',
  styleUrls: ['./wagons-form.component.css']
})
export class WagonsFormComponent implements OnInit {

  @Input() wagon: Wagon = null;
  @Output() onSubmit: EventEmitter<Wagon> = new EventEmitter<Wagon>();

  isLoading = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.onSubmit.emit(this.wagon);
  }

  listWagons() {
    this.router.navigate(['/wagons/wagons-list']);
  }

}
