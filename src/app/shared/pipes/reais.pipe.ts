import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reais'
})
export class ReaisPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value as number);
  }

}
