import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { ColumnsComponent } from './columns/columns.component';
import { ActionsButtonsComponent } from './header/actions-buttons/actions-buttons.component';
import { HeaderComponent } from './header/header.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExportComponent } from './columns/modal-export/modal-export.component';
@Component({
  selector: 'kraken-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterContentInit {
  @ContentChild(ColumnsComponent) colummnsInfo: ColumnsComponent;
  @ContentChild(HeaderComponent) HeaderButtons: HeaderComponent;
  @ContentChild(ActionsButtonsComponent) actionsButtons: ActionsButtonsComponent;

  @Input() ShowDownload: boolean = true;
  sizePage:number;
  currentPage:number;
  totalPages:number;
  constructor(
    private modalService: NgbModal
  ) { 

    this.sizePage = 10;
    this.currentPage = 1;
    this.totalPages = 10;
  }

  ngAfterContentInit(): void {
    this.refresh();
  }
  ngOnInit(): void {
  }

  refresh(){
    this.colummnsInfo.sizePage = this.sizePage;
    this.colummnsInfo.getData();
  }

  gotToPage(page){
    this.colummnsInfo.currentPage = page;
    this.currentPage = page;
    this.refresh();
  }

  showFilters(){
    this.colummnsInfo.showSearch = !this.colummnsInfo.showSearch;
  }
  
  selectAllrows(){
    //si no tiene selecciona todos
    
    if (this.colummnsInfo.TypeSelected == 'none') {
      this.colummnsInfo.groupSelected = this.colummnsInfo.data;
      this.colummnsInfo.TypeSelected = 'all';      
    } //si, si tiene, los des-selecciona
    else if(this.colummnsInfo.TypeSelected=='partial'){
      this.colummnsInfo.TypeSelected = 'none';
      this.colummnsInfo.groupSelected = [];
    }else if(this.colummnsInfo.TypeSelected=='all'){
      this.colummnsInfo.TypeSelected = 'none';
      this.colummnsInfo.groupSelected = [];
    }
  }

  export() {
    this.showDialog('all');
  }

  showDialog(type){
    const modalRef = this.modalService.open(ModalExportComponent);
    modalRef.componentInstance.father = this;
    modalRef.componentInstance.me = modalRef;
    modalRef.componentInstance.type = type;
  }

  exportPartial() {
    this.showDialog('partial');
  }

}
