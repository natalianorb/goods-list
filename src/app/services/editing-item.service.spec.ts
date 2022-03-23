import { TestBed } from '@angular/core/testing';

import { EditingItemService } from './editing-item.service';

describe('EditingItemService', () => {
  let service: EditingItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditingItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
