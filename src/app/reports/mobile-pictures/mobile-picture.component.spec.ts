import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePictureComponentComponent } from './mobile-picture.component';

describe('MobilePictureComponentComponent', () => {
  let component: MobilePictureComponentComponent;
  let fixture: ComponentFixture<MobilePictureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilePictureComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePictureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
