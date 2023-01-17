import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateObservationsModalComponent} from './update-observations-modal.component';

xdescribe('UpdateObservationsModalComponent', () => {
  let component: UpdateObservationsModalComponent;
  let fixture: ComponentFixture<UpdateObservationsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateObservationsModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObservationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
