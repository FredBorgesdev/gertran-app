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

  convertStringToDateTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const currentDate = new Date();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(seconds);
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    const hours24 = String(currentDate.getHours()).padStart(2, '0');
    const minutes24 = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds24 = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours24}:${minutes24}:${seconds24}`;
  
    return `${formattedDate}T${formattedTime}`;
  }

  loadOperation(): void {
    this.isLoading = true;
    this.service.get(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(data => {
        if(data['minimumPriceValueThirdParty']!= null)
          data['minimumPriceValueThirdParty'] = data['minimumPriceValueThirdParty'].replace('.',',')

        if(data['maximumPriceValueThirdParty']!= null)
          data['maximumPriceValueThirdParty'] = data['maximumPriceValueThirdParty'].replace('.',',')
        
        if(data['allowedTrafficEndTime']!= null)
          data['allowedTrafficEndTime'] = this.convertStringToDateTime(data['allowedTrafficEndTime']);
        if(data['allowedTrafficStartTime']!= null)
          data['allowedTrafficStartTime'] = this.convertStringToDateTime(data['allowedTrafficStartTime']);
        this.operation = data;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
        this.message.error('Erro ao carregar o registro. Tente novamente.');
      });
  }

}
