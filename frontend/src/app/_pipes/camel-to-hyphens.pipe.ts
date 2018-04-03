import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CamelToHyphens' })
export class CamelToHyphensPipe implements PipeTransform {

  /**
   * @returns converts camel case to hyphen case
   */
  transform(value: string): string {
    if (value) {
      return value
        .replace(/\s+/g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/s+$/, '')
        .toLowerCase();
    }
    return value;
  }
}
