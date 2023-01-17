import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TerminalGroupsCreateComponent} from './terminal-groups-create.component';

xdescribe('TerminalGroupsCreateComponent', () => {
  let component: TerminalGroupsCreateComponent;
  let fixture: ComponentFixture<TerminalGroupsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalGroupsCreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalGroupsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
