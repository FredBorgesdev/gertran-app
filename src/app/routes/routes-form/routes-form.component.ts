import { Component, OnInit } from '@angular/core';
import { TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Stop, StopsService} from '../../stops/stops.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-routes-form',
  templateUrl: './routes-form.component.html',
  styleUrls: ['./routes-form.component.css']
})
export class RoutesFormComponent implements OnInit {
  list: TransferItem[] = [];

  constructor(
    private stopsService: StopsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.stopsService.getAll({}).subscribe((stops) => {
      this.list = this.mapStopsToTransferItems(stops.results);
    }, () => {
      this.message.error('Erro ao carregar paradas');
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    const rightItems = this.list.filter(item => item.direction === 'right');
    const leftItems = this.list.filter(item => item.direction === 'left');
    moveItemInArray(rightItems, event.previousIndex, event.currentIndex);
    this.list = [...leftItems, ...rightItems];
  }

  private mapStopsToTransferItems(stops: Stop[]): TransferItem[] {
    return stops.map((stop) => {
      return {
        key: stop.id,
        title: stop.name,
        ...stop,
      };
    });
  }
}
