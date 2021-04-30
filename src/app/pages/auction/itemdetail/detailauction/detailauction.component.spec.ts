import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailauctionComponent } from './detailauction.component';

describe('DetailauctionComponent', () => {
  let component: DetailauctionComponent;
  let fixture: ComponentFixture<DetailauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailauctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
