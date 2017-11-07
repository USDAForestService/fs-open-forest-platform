import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, field: string, args: string): any {
    if (items) {
      return items.filter(item => item[field] === args);
    } else {
      return items;
    }
  }
}
