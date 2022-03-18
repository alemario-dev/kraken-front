import { Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '../../table.component';

@Component({
  selector: 'kraken-modal-export',
  templateUrl: './modal-export.component.html',
  styleUrls: ['./modal-export.component.css']
})
export class ModalExportComponent implements OnInit {
  @Input() father: TableComponent; // Componente que invoco el dialog
  @Input() me: any; // Referencia al modal
  @Input() type: string; // Referencia al modal

  loading: Boolean;
  constructor() { }
  ngOnInit(): void {
    this.loading = false;
    this.father?.colummnsInfo?.groupSettingSearch?.forEach(column => {
      column.export = true;
    });
  }

  generateExport(){
    if (this.type=='all') {
      this.father.colummnsInfo?.generateExcel();  
    }else{
      this.father.colummnsInfo?.generateExcelPartial();  
    }
    
    this.dismiss();
  }

  dismiss(){
    this.me.dismiss();
  }
}
