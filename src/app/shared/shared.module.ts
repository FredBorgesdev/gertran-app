import { CommonModule } from '@angular/common';
import {
  HttpClientJsonpModule,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SearchPipe } from './pipes/search.pipe';
import { TableService } from './services/table.service';
import { ThemeConstantService } from './services/theme-constant.service';
import { IdPipe } from './pipes/id.pipe';
import { ReaisPipe } from './pipes/reais.pipe';

const antdModule = [
  NzIconModule,
  NzToolTipModule,
  NzBreadCrumbModule,
  NzButtonModule,
  NzCardModule,
  NzDividerModule,
  NzDrawerModule,
  NzAvatarModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTabsModule,
  NzListModule,
  NzCalendarModule,
  NzFormModule,
  NzModalModule,
  NzSelectModule,
  NzSpinModule,
  NzUploadModule,
  NzInputModule,
  NzPaginationModule,
  NzDatePickerModule,
  NzCheckboxModule,
  NzMessageModule
];

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NzIconModule,
    PerfectScrollbarModule,
    SearchPipe,
    IdPipe,
    ReaisPipe,
    ...antdModule,
  ],
  imports: [
    RouterModule,
    CommonModule,
    PerfectScrollbarModule,
    ...antdModule
  ],
  declarations: [
    SearchPipe,
    IdPipe,
    ReaisPipe
  ],
  providers: [
    ThemeConstantService,
    TableService
  ]
})

export class SharedModule {}
