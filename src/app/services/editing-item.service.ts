import { Injectable } from '@angular/core';
import { TableItem } from '../models/TableItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditingItemService {
  public editingItem$: Subject<TableItem | null> = new Subject();

  constructor() {
    this.editingItem$.subscribe((item) => {
      this._editingItemId = item && item.id ? item.id : null;
    });
  }

  private _editingItemId: string | null = null;

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

  public setEditingItem(item: TableItem | null) {
    this.editingItem$.next(item);
  }
}
