import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WagonsFormComponent} from './wagons-form.component';

xdescribe('WagonsFormComponent', () => {
  let component: WagonsFormComponent;
  let fixture: ComponentFixture<WagonsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WagonsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
