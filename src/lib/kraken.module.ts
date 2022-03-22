import { NgModule } from '@angular/core';
import { KrakenComponent } from './kraken.component';
import { FormComponent } from './form/form.component';
import { KrakenFieldComponent } from './form/field/field.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './table/header/header.component';
import { ActionsButtonsComponent } from './table/header/actions-buttons/actions-buttons.component';
import { ColumnsComponent } from './table/columns/columns.component';
import { ColumnComponent } from './table/columns/column/column.component';
import { FooterComponent } from './table/footer/footer.component';
import { ModalExportComponent } from './table/columns/modal-export/modal-export.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    FooterComponent, 
    ModalExportComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
    ColumnComponent,
    FooterComponent
  ]
})
export class KrakenModule { }
