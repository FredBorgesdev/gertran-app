import { Component, OnInit } from '@angular/core';
import { Group } from '../groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  isLoading = false
  searchInput = ''
  displayData: Group[] = [
    {
      id: '1',
      name: 'Group 1',
    }
  ]

  groupsColumn = [
    {
      title: 'Nome do grupo',
      compare: (a: Group, b: Group) => a.name.localeCompare(b.name)
    },
    { title: 'Ações' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  search() {}

  create() {}
}
