import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UrlPipe' })
export class UrlPipe implements PipeTransform {

  /**
   * @returns Add http if isn't already part of url
   */
  transform(value: string): string {
    const regex = /(http(s?))\:\/\//gi;
    const hasHttp = regex.test(value);
    if (hasHttp) {
      return value;
    } else {
      return `http://${value}`;
    }
  }
}
