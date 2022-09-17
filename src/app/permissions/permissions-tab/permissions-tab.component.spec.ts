import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsTabComponent } from './permissions-tab.component';

describe('PermissionsTabComponent', () => {
  let component: PermissionsTabComponent;
  let fixture: ComponentFixture<PermissionsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
