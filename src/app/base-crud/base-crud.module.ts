import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCrudListComponent } from './base-crud-list/base-crud-list.component';
import { BaseCrudFormComponent } from './base-crud-form/base-crud-form.component';



@NgModule({
  declarations: [
    BaseCrudListComponent,
    BaseCrudFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BaseCrudModule { }
