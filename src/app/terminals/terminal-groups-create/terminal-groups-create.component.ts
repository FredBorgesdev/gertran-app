import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {TerminalGroups, TerminalGroupsService} from '../terminal-groups.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-terminal-groups-create',
  templateUrl: './terminal-groups-create.component.html',
  styleUrls: ['./terminal-groups-create.component.css']
})
export class TerminalGroupsCreateComponent extends BaseCrudFormComponent<TerminalGroups> implements OnInit {
  @Input() terminalGroup: TerminalGroups = null;

  constructor(
    private formBuilder: FormBuilder,
    service: TerminalGroupsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, []],
      description: [null, []],
    });
  }

  getId(): string | null {
    return this.terminalGroup?.id;
  }

  list(): void {}
}
