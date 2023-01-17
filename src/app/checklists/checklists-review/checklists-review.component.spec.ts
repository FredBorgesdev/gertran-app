import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChecklistsReviewComponent} from './checklists-review.component';

xdescribe('ChecklistsReviewComponent', () => {
  let component: ChecklistsReviewComponent;
  let fixture: ComponentFixture<ChecklistsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecklistsReviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
