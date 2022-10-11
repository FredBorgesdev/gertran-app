import {Component, OnInit} from '@angular/core';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Terminals, TerminalsService} from '../terminals.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TerminalGroupsCreateComponent} from '../terminal-groups-create/terminal-groups-create.component';
import {groupBy} from 'ramda';
import {TerminalGroups, TerminalGroupsService} from '../terminal-groups.service';
import {Pagination} from '../../shared/services/api.service';

interface GroupedTerminals {
  terminalGroup: TerminalGroups;
  terminals: Terminals[];
}

@Component({
  selector: 'app-terminals-list',
  templateUrl: './terminals-list.component.html',
  styleUrls: ['./terminals-list.component.css']
})
export class TerminalsListComponent extends BaseCrudListComponent<Terminals> {
  terminalGroups: GroupedTerminals[] = [];

  constructor(
    private terminalGroupsService: TerminalGroupsService,
    service: TerminalsService,
    router: Router,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'terminals',
      router,
      service,
      message,
      modal,
    );
  }

  openTerminalGroupForm(terminalGroup?: TerminalGroups): void {
    this.modal.create({
      nzTitle: 'Criar Grupo de Terminais',
      nzContent: TerminalGroupsCreateComponent,
      nzOkText: 'Salvar',
      nzCancelText: 'Cancelar',
      nzOnOk: (componentInstance) => {
        componentInstance.save();
        this.loadResources();
      },
      nzComponentParams: {
        terminalGroup,
      }
    });
  }

  pagination(url?: string): Pagination {
    return {
      ...super.pagination(url),
      limit: 999
    };
  }

  performPostLoadActions(): void {
    this.groupTerminalsByTerminalGroup();
    this.setUnusedTerminalGroups();
  }

  groupTerminalsByTerminalGroup(): void {
    const terminals = this.resources.results;

    if (terminals.length === 0) {
      return;
    }

    const groupedByTerminalGroup = groupBy((terminal) => {
      // console.log(terminal)
      return terminal.terminalGroup?.id
    }, terminals);

    // console.log({
    //   groupedByTerminalGroup,
    //   terminals
    // });

    this.terminalGroups = Object.keys(groupedByTerminalGroup).map((key) => ({
      terminalGroup: groupedByTerminalGroup[key][0].terminalGroup,
      terminals: groupedByTerminalGroup[key],
    }));
  }

  deleteTerminalGroup(terminalGroup: GroupedTerminals): void {
    if (terminalGroup.terminals.length > 0) {
      this.message.error('Não é possível excluir um grupo que possui terminais associados.');
      return;
    }

    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este grupo de terminais?',
      nzOkText: 'Sim',
      nzCancelText: 'Não',
      nzOnOk: () => {
        this.terminalGroupsService.delete(terminalGroup.terminalGroup.id).subscribe(() => {
          this.message.success('Grupo de terminais excluído com sucesso!');
          this.loadResources();
        });
      }
    });
  }

  private setUnusedTerminalGroups(): void {
    this.terminalGroupsService.getAll({ limit: 999 }).subscribe((terminalGroups) => {
      const unusedTerminalGroups = terminalGroups.results.filter((terminalGroup) => {
        return !this.resources.results.some((terminal) => (terminal.terminalGroup as TerminalGroups).id === terminalGroup.id);
      });

      this.terminalGroups = this.terminalGroups.concat(unusedTerminalGroups.map((terminalGroup) => ({
        terminalGroup,
        terminals: [],
      })));
    });
  }
}
