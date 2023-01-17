import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateIncidentModalComponent} from './create-incident-modal.component';

xdescribe('CreateIncidentModalComponent', () => {
  let component: CreateIncidentModalComponent;
  let fixture: ComponentFixture<CreateIncidentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateIncidentModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
