import { NgModule } from '@angular/core';
import { KrakenComponent } from './kraken.component';
import { FormComponent } from './components/form/form.component';
import { KrakenFieldComponent } from './components/form/field/field.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/table/header/header.component';
import { ActionsButtonsComponent } from './components/table/header/actions-buttons/actions-buttons.component';
import { ColumnsComponent } from './components/table/columns/columns.component';
import { ColumnComponent } from './components/table/columns/column/column.component';
import { ModalExportComponent } from './modals/modal-export/modal-export.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CreateMetafieldsComponent } from './modals/create-metafields/create-metafields.component';

@NgModule({
  declarations: [
    KrakenComponent, 
    FormComponent, 
    KrakenFieldComponent, 
    TableComponent, 
    HeaderComponent, 
    ActionsButtonsComponent, 
    ColumnsComponent, 
    ColumnComponent,
    ModalExportComponent, 
    CreateMetafieldsComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    RouterModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    KrakenComponent, 
    FormComponent, 
    KrakenFieldComponent,
    TableComponent,
    HeaderComponent,
    ActionsButtonsComponent,
    ColumnsComponent,
    ColumnComponent
  ]
})
export class KrakenModule { }
