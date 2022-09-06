import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCompaniesListComponent } from './insurance-companies-list.component';

describe('InsuranceCompaniesListComponent', () => {
  let component: InsuranceCompaniesListComponent;
  let fixture: ComponentFixture<InsuranceCompaniesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCompaniesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
