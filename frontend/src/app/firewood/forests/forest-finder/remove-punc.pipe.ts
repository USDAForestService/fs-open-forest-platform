import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RemovePunc'
})
export class RemovePuncPipe implements PipeTransform {

  /**
   * @returns Remove from string all matched items in array
   */
  transform(value: any, toRemove: Array<string>): any {
    let output = value;
    if (output) {
      toRemove.map(punc => {
        output = output.replace(punc, '');
      });
    }
    return output;
  }
}
