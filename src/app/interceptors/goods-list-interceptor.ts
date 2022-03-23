import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { GoodsList } from '../../goods-list';
import { API_SETTINGS } from '../constants/api-settings';

/** YOU SHALL NOT PASS! */
@Injectable()
export class GoodsListInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      (request.method === 'GET' && request.url === API_SETTINGS.getGoodsUrl) ||
      (request.method === 'DELETE' &&
        request.url.includes(API_SETTINGS.deleteGoodsUrl))
    ) {
      return of(new HttpResponse({ status: 200, body: GoodsList }));
    }
    if (
      (request.method === 'POST' &&
        request.url === API_SETTINGS.createGoodsUrl) ||
      (request.method === 'PUT' && request.url === API_SETTINGS.updateGoodsUrl)
    ) {
      return of(new HttpResponse({ status: 200, body: request.body }));
    }
    return next.handle(request);
  }
}
