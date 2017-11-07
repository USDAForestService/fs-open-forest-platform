import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RemovePunc'
})
export class RemovePuncPipe implements PipeTransform {

  transform(value: any, toRemove: Array<string>): any {
    let output = value;
    toRemove.map((punc) => {
        output = output.replace(punc, '');
    });
    return output;
  }

}
