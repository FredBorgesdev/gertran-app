import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationsRulesByValueTabComponent} from './operations-rules-by-value-tab.component';

xdescribe('OperationsRulesByValueTabComponent', () => {
  let component: OperationsRulesByValueTabComponent;
  let fixture: ComponentFixture<OperationsRulesByValueTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsRulesByValueTabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsRulesByValueTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
