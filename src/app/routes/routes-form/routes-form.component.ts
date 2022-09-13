import { Component, OnInit } from '@angular/core';
import { TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import { stopsList } from 'src/app/stops/stops-list/mocked-data';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-routes-form',
  templateUrl: './routes-form.component.html',
  styleUrls: ['./routes-form.component.css']
})
export class RoutesFormComponent implements OnInit {
  list: TransferItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.list = stopsList.map(stop => ({
      key: stop.id,
      title: stop.name,
      ...stop
    }));
  }

  select(item: TransferSelectChange) {
    console.log(item);
  }

  drop(event: CdkDragDrop<string[]>): void {
    const rightItems = this.list.filter(item => item.direction === 'right');
    const leftItems = this.list.filter(item => item.direction === 'left');
    moveItemInArray(rightItems, event.previousIndex, event.currentIndex);
    this.list = [...leftItems, ...rightItems];
  }
}
