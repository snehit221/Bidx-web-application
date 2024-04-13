// @author - KaushikChanabhaiDhola
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationdialogComponent } from './confirmationdialog.component';

describe('ConfirmationdialogComponent', () => {
  let component: ConfirmationdialogComponent;
  let fixture: ComponentFixture<ConfirmationdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
