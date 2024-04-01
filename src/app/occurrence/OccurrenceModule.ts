import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



import { OccurenceFormComponent } from './occurrence-form/occurrence-form.component';

@NgModule({
  declarations: [OccurenceFormComponent],
  imports: [CommonModule, ReactiveFormsModule], // Certifique-se de importar o ReactiveFormsModule aqui
  exports: [OccurenceFormComponent],
})
export class OccurrenceModule {}
