import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadUnloadByPointComponent} from './load-unload-by-point.component';

xdescribe('LoadUnloadByPointComponent', () => {
  let component: LoadUnloadByPointComponent;
  let fixture: ComponentFixture<LoadUnloadByPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadUnloadByPointComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadUnloadByPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
