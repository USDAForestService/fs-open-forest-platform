import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'SpacesToDashes' })
export class SpacesToDashesPipe implements PipeTransform {

  /**
   * @returns convert spaces to dashes
   */
  transform(value: string): string {
    if (value) {
      const nospaces = value.replace(/\s+/g, '-').toLowerCase();
      return nospaces;
    }
    return value;
  }
}
