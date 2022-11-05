import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsHistoryComponent } from './commands-history.component';

describe('CommandsHistoryComponent', () => {
  let component: CommandsHistoryComponent;
  let fixture: ComponentFixture<CommandsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
