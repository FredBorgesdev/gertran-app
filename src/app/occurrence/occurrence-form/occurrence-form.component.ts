import {Component, OnInit} from '@angular/core';
import {PermissionsService} from '../../shared/services/permissions.service';

@Component({
  selector: 'app-occurrence-form',
  templateUrl: './occurrence-form.component.html',
  styleUrls: ['./occurrence-form.component.css']
})
export class OccurenceFormComponent implements OnInit {

  constructor(
    private permissionService: PermissionsService,
  ) { }

  ngOnInit(): void {

  }


}
