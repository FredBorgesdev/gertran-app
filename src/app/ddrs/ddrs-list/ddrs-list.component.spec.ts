import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DdrsListComponent} from './ddrs-list.component';

xdescribe('DdrsListComponent', () => {
  let component: DdrsListComponent;
  let fixture: ComponentFixture<DdrsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DdrsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdrsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
