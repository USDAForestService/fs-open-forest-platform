import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DashesToSpacesAndCapitalize' })
export class DashesToSpacesAndCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    const space = value.replace('-', ' ');
    return space.charAt(0).toUpperCase() + space.slice(1);
  }
}
