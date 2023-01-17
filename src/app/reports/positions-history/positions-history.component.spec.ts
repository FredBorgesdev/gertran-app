import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PositionsHistoryComponent} from './positions-history.component';

xdescribe('PositionsHistoryComponent', () => {
  let component: PositionsHistoryComponent;
  let fixture: ComponentFixture<PositionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionsHistoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
