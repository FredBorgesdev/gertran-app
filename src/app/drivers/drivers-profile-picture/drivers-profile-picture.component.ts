import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drivers-profile-picture',
  templateUrl: './drivers-profile-picture.component.html',
  styleUrls: ['./drivers-profile-picture.component.css']
})
export class DriversProfilePictureComponent implements OnInit {

  @Input() driver: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  save() {}
}
