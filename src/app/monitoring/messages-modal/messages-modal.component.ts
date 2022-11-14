import {Component, Input, OnInit} from '@angular/core';
import {Message, MessagesService} from '../messages.service';
import {Position} from '../positions.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.css']
})
export class MessagesModalComponent implements OnInit {
  @Input() position: Position;
  message = '';
  freeText = '';
  messages: Message[] = [];
  isLoading = false;

  constructor(
    private messagesService: MessagesService,
    private messageToast: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.messagesService.getMessages(this.position.trackerModel.id).subscribe(messages => {
      this.messages = messages;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.messageToast.error('Erro ao carregar macros');
    });
  }

  sendMessage(): void {
    this.messagesService.requestMessage({
      trackerSerialNumber: this.position.trackerSerialNumber,
      trackerModel: this.position.trackerModel.id,
      code: this.code,
      message: this.freeText,
    }).subscribe(() => {});
  }

  get code(): string | number {
    if (this.freeText) {
      return 0;
    }

    return this.message;
  }
}
