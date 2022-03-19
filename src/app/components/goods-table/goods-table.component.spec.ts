import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsTableComponent } from './goods-table.component';

describe('GoodsTableComponent', () => {
  let component: GoodsTableComponent;
  let fixture: ComponentFixture<GoodsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
