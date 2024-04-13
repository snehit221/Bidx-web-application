/* Author: Ubaidullah */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderListComponent } from './seller-order-list.component';

describe('SellerOrderListComponent', () => {
  let component: SellerOrderListComponent;
  let fixture: ComponentFixture<SellerOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
