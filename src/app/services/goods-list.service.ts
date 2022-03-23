import { Injectable } from '@angular/core';
import { Good } from '../models/Good';
import { Observable, tap, throwError } from 'rxjs';
import { TableItem } from '../models/TableItem';
import { API_SETTINGS } from '../constants/api-settings';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EditingItemService } from './editing-item.service';
import { idGenerator } from '../helpers/id-generator';

@Injectable({
  providedIn: 'root',
})
export class TableItemsService {
  public lastItems: TableItem[] = [];

  constructor(
    private http: HttpClient,
    private editingItemService: EditingItemService
  ) {
    this.getAll$().subscribe(this.createGoodsObserver());
  }

  getAll$(): Observable<Good[]> {
    return this.http
      .get<Good[]>(API_SETTINGS.getGoodsUrl)
      .pipe(retry(3), catchError(this.handleError));
  }

  public delete(item: TableItem) {
    const index = this.lastItems.findIndex((i) => i.id === item.id);
    const url = `${API_SETTINGS.deleteGoodsUrl}/${item.good.vendorCode}`;

    if (index < 0) {
      return throwError(() => new Error());
    }

    return this.http.delete(url).pipe(
      retry(3),
      catchError(this.handleError),
      tap(() => {
        this.lastItems.splice(index, 1);
      })
    );
  }

  public trySaveNew(good: Good) {
    return this.save(good).pipe(
      tap(() => {
        this.lastItems.push(new TableItem(good, idGenerator()));
      })
    );
  }

  public updateExisting(good: Good): Observable<any> {
    const oldItem = this.lastItems.find(
      (i) => i.id === this.editingItemService.editingItemId
    );

    if (!oldItem) {
      return throwError(
        () => new Error('В списке товаров не найден этот товар.')
      );
    }

    return this.save(good).pipe(
      tap(() => {
        oldItem.good = good;
      })
    );
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

  private save(good: Good) {
    const url = this.editingItemService.isEditMode
      ? API_SETTINGS.updateGoodsUrl
      : API_SETTINGS.createGoodsUrl;
    const method = this.editingItemService.isEditMode ? 'put' : 'post';

    return this.http[method](url, good).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
}
