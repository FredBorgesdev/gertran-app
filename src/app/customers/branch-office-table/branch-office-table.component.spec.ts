import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeTableComponent } from './branch-office-table.component';

describe('BranchOfficeTableComponent', () => {
  let component: BranchOfficeTableComponent;
  let fixture: ComponentFixture<BranchOfficeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOfficeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
