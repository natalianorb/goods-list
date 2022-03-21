import { Injectable } from '@angular/core';
import { Good } from '../models/Good';
import { Observable, Subject, throwError } from 'rxjs';
import { TableItem } from '../models/TableItem';
import { API_SETTINGS } from '../constants/api-settings';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { idGenerator } from '../helpers/id-generator';

@Injectable({
  providedIn: 'root',
})
export class TableItemsService {
  editingItem$: Subject<TableItem | null> = new Subject();
  public lastItems: TableItem[] = [];
  private _editingItemId: string | null = null;

  constructor(private http: HttpClient) {
    this.getAll$().subscribe(this.createGoodsObserver());
    this.editingItem$.subscribe((item) => {
      this._editingItemId = item && item.id ? item.id : null;
    });
  }

  getAll$(): Observable<Good[]> {
    return this.http
      .get<Good[]>(API_SETTINGS.getGoods)
      .pipe(retry(3), catchError(this.handleError));
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

    this.lastItems.push(new TableItem(good, idGenerator()));
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

  private createGoodsObserver() {
    return (goods: Good[]) => {
      if (!goods) {
        this.lastItems = [];
        return;
      }

      this.lastItems = goods.map((g: Good) => {
        const { vendorCode, title, country, propTitle, propValue } = g;
        const good = new Good(vendorCode, title, country, propTitle, propValue);

        return new TableItem(good);
      });
    };
  }
  // todo move to httpInterceptor
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `API returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  // todo add interceptor
  private save() {}
}
