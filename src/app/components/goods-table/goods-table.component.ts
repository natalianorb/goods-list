import { Component } from '@angular/core';
import { TableItemsService } from '../../services/goods-list.service';
import { TableItem } from '../../models/TableItem';
import { EditingItemService } from '../../services/editing-item.service';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.scss'],
})
export class GoodsTableComponent {
  items = this.tableItemsService.lastItems;

  constructor(
    private tableItemsService: TableItemsService,
    private editingItemService: EditingItemService
  ) {}

  get isVisible() {
    return !!this.items.length && !this.editingItemService.editingItemId;
  }

  edit(item: TableItem) {
    this.editingItemService.beginEdit(item);
  }

  delete(item: TableItem) {
    this.tableItemsService.delete(item);
  }

  canDelete(item: TableItem) {
    return item.id !== this.editingItemService.editingItemId;
  }
}
