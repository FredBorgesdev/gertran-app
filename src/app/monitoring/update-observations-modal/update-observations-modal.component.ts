import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../positions.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TrucksService} from '../../trucks/trucks.service';

@Component({
  selector: 'app-update-observations-modal',
  templateUrl: './update-observations-modal.component.html',
  styleUrls: ['./update-observations-modal.component.css']
})
export class UpdateObservationsModalComponent implements OnInit {
  @Input() item: Position;

  observation: string;

  constructor(
    private service: TrucksService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.observation = this.item.positionInfo.observations;
  }

  save(): void {
    this.service.update(this.item.truck.id, {
      description: this.observation,
    } as any).subscribe(() => {
      this.item.positionInfo.observations = this.observation;
      this.message.success('Observações atualizadas com sucesso');
    }, () => {
      this.message.error('Erro ao atualizar observações');
    });
  }
}
