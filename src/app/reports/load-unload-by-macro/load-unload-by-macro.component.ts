import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-unload-by-macro',
  templateUrl: './load-unload-by-macro.component.html',
  styleUrls: ['./load-unload-by-macro.component.css']
})
export class LoadUnloadByMacroComponent implements OnInit {
  isLoading = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
