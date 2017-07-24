import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'spacesToDashes' })
export class SpacesToDashesPipe implements PipeTransform {
  transform(value: string): string {
    const nospaces = value.replace(/\s+/g, '-');
    return nospaces;
  }
}
