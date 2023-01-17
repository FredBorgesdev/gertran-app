import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InsuranceCompaniesFormComponent} from './insurance-companies-form.component';

xdescribe('InsuranceCompaniesFormComponent', () => {
  let component: InsuranceCompaniesFormComponent;
  let fixture: ComponentFixture<InsuranceCompaniesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsuranceCompaniesFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCompaniesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
