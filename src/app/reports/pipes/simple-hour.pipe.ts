import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'simpleHour'
})
export class SimpleHourPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value){
      return value.toString().split('.')[0];
    }

    return ''
    
  }

}
