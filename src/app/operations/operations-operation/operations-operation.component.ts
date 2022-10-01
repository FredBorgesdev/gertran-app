import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {OperationsService} from '../operations.service';

@Component({
  selector: 'app-operations-operation',
  templateUrl: './operations-operation.component.html',
  styleUrls: ['./operations-operation.component.css']
})
export class OperationsOperationComponent implements OnInit {
  operation = null;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private service: OperationsService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.loadOperation();
    }
  }

  loadOperation(): void {
    this.isLoading = true;
    this.service.get(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.operation = data;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
        this.message.error('Erro ao carregar o registro. Tente novamente.');
      });
  }

}
