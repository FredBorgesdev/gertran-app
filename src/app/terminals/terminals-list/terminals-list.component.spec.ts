import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TerminalsListComponent} from './terminals-list.component';

xdescribe('TerminalsListComponent', () => {
  let component: TerminalsListComponent;
  let fixture: ComponentFixture<TerminalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
