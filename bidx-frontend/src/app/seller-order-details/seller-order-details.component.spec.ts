/* Author: Ubaidullah */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderDetailsComponent } from './seller-order-details.component';

describe('SellerOrderDetailsComponent', () => {
  let component: SellerOrderDetailsComponent;
  let fixture: ComponentFixture<SellerOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
