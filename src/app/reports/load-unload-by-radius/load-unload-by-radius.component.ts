import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-unload-by-radius',
  templateUrl: './load-unload-by-radius.component.html',
  styleUrls: ['./load-unload-by-radius.component.css']
})
export class LoadUnloadByRadiusComponent implements OnInit {
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
