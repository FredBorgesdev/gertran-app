import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientChecklistsComponent} from './client-checklists.component';

describe('ChecklistsComponent', () => {
  let component: ClientChecklistsComponent;
  let fixture: ComponentFixture<ClientChecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientChecklistsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
