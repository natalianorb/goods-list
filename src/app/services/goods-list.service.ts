import { Injectable } from '@angular/core';
import { Good } from '../models/Good';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableItem } from '../models/TableItem';

@Injectable({
  providedIn: 'root',
})
export class TableItemsService {
  editingItem$: Subject<TableItem | null> = new Subject();
  public lastItems: TableItem[] = [];
  private _editingItemId: string | null = null;

  constructor() {
    this.editingItem$.subscribe((item) => {
      this._editingItemId = item ? item.id : null;
    });
  }

  get editingItemId() {
    return this._editingItemId;
  }

  get isEditMode() {
    return !!this._editingItemId;
  }

  public beginEdit(item: TableItem) {
    this.setEditingItem(item);
  }

  public cancelEdit() {
    this.setEditingItem(null);
  }

  public delete(item: TableItem) {
    const index = this.lastItems.findIndex((i) => i.id === item.id);

    if (index < 0) {
      return;
    }
    this.lastItems.splice(index, 1);
  }

  public trySaveNew(good: Good): boolean {
    const sameVendorCode = this.lastItems.find(
      (i) => i.good.vendorCode === good.vendorCode
    );

    if (sameVendorCode) {
      return false;
    }

    this.lastItems.push({ good, id: Date.now().toString() });
    return true;
  }

  public updateExisting(good: Good) {
    const oldItem = this.lastItems.find((i) => i.id === this._editingItemId);

    if (!oldItem) {
      return;
    }
    oldItem.good = good;

    this.setEditingItem(null);
  }

  private setEditingItem(item: TableItem | null) {
    this.editingItem$.next(item);
  }

  // todo add interceptor
  private save() {}
}
