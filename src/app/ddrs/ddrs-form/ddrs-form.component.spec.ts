import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DdrsFormComponent} from './ddrs-form.component';

xdescribe('DdrsFormComponent', () => {
  let component: DdrsFormComponent;
  let fixture: ComponentFixture<DdrsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DdrsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdrsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
