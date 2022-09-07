import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DocumentTypesListComponent } from './document-types-list/document-types-list.component';
import { DocumentTypesRoutingModule } from './document-types-routing.module';
import { DocumentTypesFormComponent } from './document-types-form/document-types-form.component';


@NgModule({
  declarations: [
    DocumentTypesListComponent,
    DocumentTypesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DocumentTypesRoutingModule
  ]
})
export class DocumentTypesModule { }
