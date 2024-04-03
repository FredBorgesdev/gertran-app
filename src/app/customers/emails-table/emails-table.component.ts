import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { EmailDataItem } from '../emails.service';

@Component({
  selector: 'app-emails-table',
  templateUrl: './emails-table.component.html',
  styleUrls: ['./emails-table.component.css']
})
export class EmailsTableComponent implements OnInit {

  @Input() emails: GetAllResponse<EmailDataItem> = null;
  @Output() onEdit: EventEmitter<EmailDataItem> = new EventEmitter<EmailDataItem>();
  @Output() onDelete: EventEmitter<EmailDataItem> = new EventEmitter<EmailDataItem>();
  @Output() onPaginate: EventEmitter<string> = new EventEmitter<string>();


  emailsOrderColumn = [
    { title: 'ID' },
    {
      title: 'Nome do reponsável pelo email',
      compare: (a: EmailDataItem, b: EmailDataItem) => a.name.localeCompare(b.name)
    },
    { title: 'Email' },
    // { title: 'Ações' }
  ];

  get page() {
    return getCurrentPage(this.emails);
  }

  constructor() { }

  ngOnInit(): void {
  }

  edit(item: EmailDataItem) {
    this.onEdit.emit(item);
  }

  delete(item: EmailDataItem) {
    this.onDelete.emit(item);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.onPaginate.emit(this.emails.previous);
    } else if (params.pageIndex > this.page) {
      this.onPaginate.emit(this.emails.next);
    }
  }
}
