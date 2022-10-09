import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalGroupsListComponent } from './terminal-groups-list.component';

describe('TerminalGroupsListComponent', () => {
  let component: TerminalGroupsListComponent;
  let fixture: ComponentFixture<TerminalGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalGroupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
