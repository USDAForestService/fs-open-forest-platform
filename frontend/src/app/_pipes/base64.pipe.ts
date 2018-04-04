import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64'
})
export class Base64 implements PipeTransform {

  /**
   * @returns base64 encoded string
   */
  public transform(value: any) {
    return btoa(value);
  }
}
