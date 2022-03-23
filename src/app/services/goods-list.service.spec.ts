import { TestBed } from '@angular/core/testing';

import { TableItemsService } from './goods-list.service';

describe('GoodsListService', () => {
  let service: TableItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
