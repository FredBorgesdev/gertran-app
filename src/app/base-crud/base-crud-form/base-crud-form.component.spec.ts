import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseCrudFormComponent} from './base-crud-form.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Overlay} from '@angular/cdk/overlay';

export const DEFAULT_CRUD_FORM_PROVIDERS = [
  Overlay,
  NzMessageService,
  NzModalService,
];

xdescribe('BaseCrudFormComponent', () => {
  let component: BaseCrudFormComponent<any>;
  let fixture: ComponentFixture<BaseCrudFormComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseCrudFormComponent],
      providers: DEFAULT_CRUD_FORM_PROVIDERS
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCrudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
