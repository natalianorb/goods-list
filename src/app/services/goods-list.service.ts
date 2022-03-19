import { Injectable } from '@angular/core';
import { Good } from '../models/Good';
import { Subject } from 'rxjs';
import { TableItem } from '../models/TableItem';

@Injectable({
  providedIn: 'root',
})
export class GoodsListService {
  items$: Subject<TableItem[]> = new Subject<TableItem[]>();
  lastItems: TableItem[] = [];
  constructor() {}
  addGood(good: Good) {
    const existingItem = this.lastItems.find((i) => i.id === good.id);

    if (!existingItem) {
      this.lastItems.push({ good, id: good.id, count: 1 });
    } else {
      existingItem.count++;
    }
    this.items$.next(this.lastItems);
  }
  // todo add interceptor
  save() {}
}
