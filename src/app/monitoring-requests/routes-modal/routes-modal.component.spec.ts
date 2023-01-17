import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutesModalComponent} from './routes-modal.component';

xdescribe('RoutesModalComponent', () => {
  let component: RoutesModalComponent;
  let fixture: ComponentFixture<RoutesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutesModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
