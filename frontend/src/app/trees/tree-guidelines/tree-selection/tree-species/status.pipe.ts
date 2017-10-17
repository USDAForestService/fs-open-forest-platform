import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'status'
})

export class StatusPipe implements PipeTransform {

  transform(items: any, args: string): any {
    if (items) {
      return items.filter(item => item.status === args)
    } else {
      return items;
    }
  }

}