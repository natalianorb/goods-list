import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoodsListInterceptor } from './goods-list-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GoodsListInterceptor, multi: true },
];
