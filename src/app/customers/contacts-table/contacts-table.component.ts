import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { ContactDataItem } from '../contacts.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent implements OnInit {

  @Input() contacts: GetAllResponse<ContactDataItem> = null;
  @Output() onEdit: EventEmitter<ContactDataItem> = new EventEmitter<ContactDataItem>();
  @Output() onDelete: EventEmitter<ContactDataItem> = new EventEmitter<ContactDataItem>();
  @Output() onPaginate: EventEmitter<string> = new EventEmitter<string>();


  contactsOrderColumn = [
    { title: 'ID' },
    {
      title: 'Nome do contato',
      compare: (a: ContactDataItem, b: ContactDataItem) => a.name.localeCompare(b.name)
    },
    { title: 'Email' },
    { title: 'Telefone comercial' },
    { title: 'Telefone celular' },
    { title: 'Principal' },
    { title: 'Ações' }
  ];

  get page() {
    return getCurrentPage(this.contacts);
  }

  constructor() { }

  ngOnInit(): void {
  }

  edit(item: ContactDataItem) {
    this.onEdit.emit(item);
  }

  delete(item: ContactDataItem) {
    this.onDelete.emit(item);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.onPaginate.emit(this.contacts.previous);
    } else if (params.pageIndex > this.page) {
      this.onPaginate.emit(this.contacts.next);
    }
  }
}
