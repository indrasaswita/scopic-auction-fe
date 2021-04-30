import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemrowComponent } from './itemrow.component';

describe('ItemrowComponent', () => {
  let component: ItemrowComponent;
  let fixture: ComponentFixture<ItemrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
