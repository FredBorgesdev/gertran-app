import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../positions.service';
import {Command, CommandsService} from '../commands.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-commands-modal',
  templateUrl: './commands-modal.component.html',
  styleUrls: ['./commands-modal.component.css']
})
export class CommandsModalComponent implements OnInit {
  @Input() position: Position;
  commands: Command[] = [];
  command = '';
  isLoading = false;

  constructor(
    private commandsService: CommandsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.commandsService.getCommands(this.position.trackerModel.id).subscribe(commands => {
      this.commands = commands;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar comandos');
    });
  }

  sendCommand(): void {
    this.commandsService.requestCommand({
      trackerSerialNumber: this.position.trackerSerialNumber,
      trackerModel: this.position.trackerModel.id,
      code: this.command,
    }).subscribe(() => {});
  }
}
