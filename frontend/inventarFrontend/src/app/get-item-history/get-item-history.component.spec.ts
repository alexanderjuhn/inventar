import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItemHistoryComponent } from './get-item-history.component';

describe('GetItemHistoryComponent', () => {
  let component: GetItemHistoryComponent;
  let fixture: ComponentFixture<GetItemHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetItemHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetItemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
