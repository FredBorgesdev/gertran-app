import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersUserComponent} from './users-user.component';

xdescribe('UsersUserComponent', () => {
  let component: UsersUserComponent;
  let fixture: ComponentFixture<UsersUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersUserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
