import { Component } from '@angular/core';
import { GoodsListService } from '../../services/goods-list.service';
import { Subject } from 'rxjs';
import { TableItem } from '../../models/TableItem';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.scss'],
})
export class GoodsTableComponent {
  items$: Subject<TableItem[]>;
  constructor(private goodsListService: GoodsListService) {
    this.items$ = this.goodsListService.items$;
  }
}
