import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactDataItem, ContactsService } from '../contacts.service';
import { Customer } from '../customers.service';

@Component({
  selector: 'app-contacts-tab',
  templateUrl: './contacts-tab.component.html',
  styleUrls: ['./contacts-tab.component.css']
})
export class ContactsTabComponent implements OnInit {

  @Input() customer: Customer

  contactsDisplayData: ContactDataItem[] = []

  isCreatingContact = false
  isLoading = false
  contact: ContactDataItem = null

  constructor(
    private contactsService: ContactsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadContacts()
  }

  loadContacts() {
    this.contactsService.getAll(this.customer.id).subscribe(contacts => {
      this.contactsDisplayData = contacts
    })
  }

  save(contact: ContactDataItem) {
    this.isLoading = true

    if (this.contact?.id) {
      this.contactsService.update(this.contact.id, contact, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      )
    } else {
      this.contactsService.save(contact, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      )
    }
  }

  edit(contact: ContactDataItem) {
    this.isCreatingContact = true
    this.contact = contact
  }

  delete(contact: ContactDataItem) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este contato?',
      nzOnOk: () => {
        this.isLoading = true
        this.contactsService.delete(contact.id, this.customer.id).subscribe(() => {
          this.contactsDisplayData = this.contactsDisplayData.filter(c => c.id !== contact.id)
          this.isLoading = false
        }, () => this.handleFailure())
      }
    })
  }

  private handleSuccess() {
    this.message.success('Contato salvo com sucesso')
    this.isCreatingContact = false
    this.isLoading = false
    this.contact = null
    this.loadContacts()
  }

  private handleFailure() {
    this.message.error('Ocorreu um erro ao salvar o contato')
    this.isLoading = false
  }
}
