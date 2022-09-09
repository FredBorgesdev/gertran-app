import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsTabComponent } from './documents-tab/documents-tab.component';
import { DocumentsTableComponent } from './documents-table/documents-table.component';
import { DocumentsFormComponent } from './documents-form/documents-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DocumentsTabComponent,
    DocumentsTableComponent,
    DocumentsFormComponent
  ],
  exports: [
    DocumentsTabComponent,
    DocumentsTableComponent,
    DocumentsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DocumentsModule { }
