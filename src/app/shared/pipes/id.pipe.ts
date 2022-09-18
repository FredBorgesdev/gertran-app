import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const firstFour = value.toString().slice(0, 4);
    const lastFour = value.toString().slice(-4);

    return `${firstFour}...${lastFour}`;
  }

}
