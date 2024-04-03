import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetAllResponse } from 'src/app/shared/services/api.service';
import { EmailDataItem, EmailsService } from '../emails.service';
import { Customer } from '../customers.service';

@Component({
  selector: 'app-emails-tab',
  templateUrl: './emails-tab.component.html',
  styleUrls: ['./emails-tab.component.css']
})
export class EmailsTabComponent implements OnInit {

  @Input() customer: Customer;

  emailsDisplayData: GetAllResponse<EmailDataItem> = null;

  isCreatingEmail = false;
  isLoading = false;
  email: EmailDataItem = null;

  constructor(
    private emailsService: EmailsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(url?: string) {
    this.emailsService.getAll({ url }, this.customer.id).subscribe(emails => {
      this.emailsDisplayData = emails;
    });
  }

  save(email: EmailDataItem) {
    this.isLoading = true;
    if (this.email?.id) {
      this.emailsService.update(this.email.id, email, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      );
    } else {
      this.emailsService.save(email, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      );
    }
  }

  edit(email: EmailDataItem) {
    this.isCreatingEmail = true;
    this.email = email;
  }

  delete(email: EmailDataItem) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este email?',
      nzOnOk: () => {
        this.isLoading = true;
        this.emailsService.delete(email.id, this.customer.id).subscribe(() => {
          this.loadEmails();
          this.isLoading = false;
        }, () => this.handleFailure());
      }
    });
  }

  private handleSuccess() {
    this.message.success('Email salvo com sucesso');
    this.isCreatingEmail = false;
    this.isLoading = false;
    this.email = null;
    this.loadEmails();
  }

  private handleFailure() {
    this.message.error('Ocorreu um erro ao salvar o contato');
    this.isLoading = false;
  }
}
