// Shahroz Ahmad

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBiddingComponent } from './manual-bidding.component';

describe('ManualBiddingComponent', () => {
  let component: ManualBiddingComponent;
  let fixture: ComponentFixture<ManualBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualBiddingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
