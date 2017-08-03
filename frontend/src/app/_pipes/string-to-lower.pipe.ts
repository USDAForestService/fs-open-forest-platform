import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringToLower' })
export class StringToLowerPipe implements PipeTransform {
  transform(value: string): string {
    const lower = value.toLowerCase();
    return lower;
  }
}
