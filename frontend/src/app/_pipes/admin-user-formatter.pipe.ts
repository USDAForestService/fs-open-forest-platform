import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'AdminUserFormatterPipe' })
export class AdminUserFormatterPipe implements PipeTransform {

  /**
   * @returns converts underscores to spaces and capitalizes first letter of each word
   */
  transform(name: string): string {
    if (name && name.indexOf('@') === -1) {
      return name.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, first => first.toLocaleUpperCase());
    }
    return name;
  }
}
