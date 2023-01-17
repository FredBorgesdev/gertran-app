import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DriversProfilePictureComponent} from './drivers-profile-picture.component';

xdescribe('DriversProfilePictureComponent', () => {
  let component: DriversProfilePictureComponent;
  let fixture: ComponentFixture<DriversProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversProfilePictureComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
