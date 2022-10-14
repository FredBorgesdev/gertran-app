import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-unload-by-point',
  templateUrl: './load-unload-by-point.component.html',
  styleUrls: ['./load-unload-by-point.component.css']
})
export class LoadUnloadByPointComponent implements OnInit {
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
