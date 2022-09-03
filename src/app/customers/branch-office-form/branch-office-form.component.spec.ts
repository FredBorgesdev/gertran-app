import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeFormComponent } from './branch-office-form.component';

describe('BranchOfficeFormComponent', () => {
  let component: BranchOfficeFormComponent;
  let fixture: ComponentFixture<BranchOfficeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOfficeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
