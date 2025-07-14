import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractUser } from '../users.service';
import { SelectableUsersService } from '../selectable-users.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  providers: [SelectableUsersService]
})
export class UserSelectComponent implements OnInit {
  @Input() filterByAll = false;
  @Output() userSelected = new EventEmitter<AbstractUser | 'all'>();

  selectedUserId: number | string | null = null;

  constructor(public userService: SelectableUsersService) {}

  ngOnInit(): void {
    this.userService.init();
  }

  onSearch(value: string): void {
    this.userService.searchByName(value);
  }

  onScrollToBottom(): void {
    this.userService.loadMoreUsers();
  }

  onSelect(userId: number | string): void {
    this.selectedUserId = userId;
    const selected = this.userService.users.find(u => u.id === userId);
    this.userSelected.emit(userId === 'all' ? 'all' : selected || null);
  }
}
