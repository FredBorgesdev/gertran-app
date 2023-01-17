import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChecklistsCreateComponent} from './checklists-create.component';

xdescribe('ChecklistsCreateComponent', () => {
  let component: ChecklistsCreateComponent;
  let fixture: ComponentFixture<ChecklistsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecklistsCreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
