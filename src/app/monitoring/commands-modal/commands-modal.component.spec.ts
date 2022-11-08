import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsModalComponent } from './commands-modal.component';

describe('CommandsModalComponent', () => {
  let component: CommandsModalComponent;
  let fixture: ComponentFixture<CommandsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
