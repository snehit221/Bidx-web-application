// Shahroz Ahmad

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticBiddingComponent } from './automatic-bidding.component';

describe('AutomaticBiddingComponent', () => {
  let component: AutomaticBiddingComponent;
  let fixture: ComponentFixture<AutomaticBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaticBiddingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutomaticBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
