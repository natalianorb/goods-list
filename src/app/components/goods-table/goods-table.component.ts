import { Component } from '@angular/core';
import { TableItemsService } from '../../services/goods-list.service';
import { TableItem } from '../../models/TableItem';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.scss'],
})
export class GoodsTableComponent {
  items = this.tableItemsService.lastItems;
  isVisible = !!this.items.length;
  constructor(private tableItemsService: TableItemsService) {}
  edit(item: TableItem) {
    this.tableItemsService.beginEdit(item);
  }
  delete(item: TableItem) {
    this.tableItemsService.delete(item);
  }
  canDelete(item: TableItem) {
    return item.id !== this.tableItemsService.editingItemId;
  }
}
