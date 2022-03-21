import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { GoodsList } from '../../goods-list';
import { API_SETTINGS } from '../constants/api-settings';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class GetGoodsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url === API_SETTINGS.getGoods) {
      return of(new HttpResponse({ status: 200, body: GoodsList }));
    }
    return next.handle(request);
  }
}
