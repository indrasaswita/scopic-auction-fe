import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctiontimerComponent } from './auctiontimer.component';

describe('AuctiontimerComponent', () => {
  let component: AuctiontimerComponent;
  let fixture: ComponentFixture<AuctiontimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctiontimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctiontimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
