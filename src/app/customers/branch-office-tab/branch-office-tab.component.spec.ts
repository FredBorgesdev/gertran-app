import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeTabComponent } from './branch-office-tab.component';

describe('BranchOfficeTabComponent', () => {
  let component: BranchOfficeTabComponent;
  let fixture: ComponentFixture<BranchOfficeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOfficeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
