import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GetGoodsInterceptor } from './get-goods-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GetGoodsInterceptor, multi: true },
];
