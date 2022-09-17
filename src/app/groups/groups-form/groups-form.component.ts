import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Group, GroupsService} from '../groups.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent extends BaseCrudFormComponent<Group> {
  group: Group;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    service: GroupsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      permissions: [[], []]
    });
  }

  list(): void {
    this.router.navigate(['groups', 'groups-list']);
  }

  setPermissions(permissions: number[]): void {
    this.validateForm.controls.permissions.setValue(permissions);
  }
}
