import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ChunkArray'
})
export class ChunkArrayPipe implements PipeTransform {

  transform(value: any, n: number): any {
    return this.chunk(value, n);
  }

  chunk(arr, numCols) {
    const result: any[][] = [];
    const numPerArray = Math.ceil(arr.length / numCols);
    for (let i = 0; i < arr.length; i++) {
      if (i % numPerArray === 0) {
        result.push([arr[i]]);
      } else {
        result[result.length - 1].push(arr[i]);
      }
    }

    return result;
  }
}

