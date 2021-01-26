import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, limit: number) {
    if(value.length > limit) {
      limit = value.substr(0, limit).lastIndexOf(' ');
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }

}
