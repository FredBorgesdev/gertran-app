import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadUnloadByRadiusComponent } from './load-unload-by-radius.component';

describe('LoadUnloadByRadiusComponent', () => {
  let component: LoadUnloadByRadiusComponent;
  let fixture: ComponentFixture<LoadUnloadByRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadUnloadByRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadUnloadByRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
