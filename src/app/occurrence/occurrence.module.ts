import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
// import { NgZorroAntdModule } from 'ng-zorro-antd';

import { OccurenceFormComponent } from './occurrence-form/occurrence-form.component';
@NgModule({
  declarations: [OccurenceFormComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NzDescriptionsModule, 
    NzFormModule, 
    // NgZorroAntdModule
  ],
  exports: [OccurenceFormComponent],
})
export class OccurrenceModule {}