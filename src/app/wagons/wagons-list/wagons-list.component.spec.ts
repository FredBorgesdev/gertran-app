import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WagonsListComponent} from './wagons-list.component';

xdescribe('WagonsListComponent', () => {
  let component: WagonsListComponent;
  let fixture: ComponentFixture<WagonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WagonsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
