import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * @returns Filtered array
   */
  transform(items: any, field: string, args: string): any {
    if (items) {
      return items.filter(item => item[field] === args);
    } else {
      return items;
    }
  }
}
