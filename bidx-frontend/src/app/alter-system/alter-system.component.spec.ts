// @author - KaushikChanabhaiDhola
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterSystemComponent } from './alter-system.component';

describe('AlterSystemComponent', () => {
  let component: AlterSystemComponent;
  let fixture: ComponentFixture<AlterSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
