import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadUnloadByMacroComponent } from './load-unload-by-macro.component';

describe('LoadUnloadByMacroComponent', () => {
  let component: LoadUnloadByMacroComponent;
  let fixture: ComponentFixture<LoadUnloadByMacroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadUnloadByMacroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadUnloadByMacroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
