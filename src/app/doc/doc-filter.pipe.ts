import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docFilter'
})
export class DocFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      let a = (item && item.title) ? String(item.title) : '';
      let b = (item && item.category) ? String(item.category) : '';
      let c = (item && item.text) ? String(item.text) : '';
      let d = (item && item.lastUpdatedBy) ? String(item.lastUpdatedBy) : '';
      let e = (item && item.subTitle) ? String(item.subTitle) : '';

      if (
        (a.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (c.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (d.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (e.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item);
      }


    }

    return resultArray;
  }
}
