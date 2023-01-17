import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseCrudListComponent} from './base-crud-list.component';

xdescribe('BaseCrudListComponent', () => {
  let component: BaseCrudListComponent<any>;
  let fixture: ComponentFixture<BaseCrudListComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseCrudListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCrudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
