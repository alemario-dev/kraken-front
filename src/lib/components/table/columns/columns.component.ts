import { AfterContentInit, Component, ContentChildren, Input, OnInit, Output, QueryList } from '@angular/core';
import {TYPESORT } from '../settingsTable.model';
import { ColumnComponent } from './column/column.component';
import { TableColumn } from '../../../interfaces/table/settings/settingColumn';
import { KrakenDataTable } from '../../../interfaces/table/DataSchema/schemaDataTable';
import { KrakenOptionsColumns, KrakenSettingsColumns } from '../../../interfaces/table/settings/KrakenSettingsColumns';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExportComponent } from '../../../modals/modal-export/modal-export.component';
import { Router } from '@angular/router';

@Component({
  selector: 'kraken-table-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit, AfterContentInit {
  @ContentChildren(ColumnComponent) contenido: QueryList<ColumnComponent>;

  _globalCurrency;

  @Input() dataClass: KrakenDataTable;
  @Input() settings: KrakenSettingsColumns<any>;

  //para que el nombre del input sea mas corto se hizo de esta manera
  @Input() set currency(simbol){
    this._globalCurrency = simbol;
  };

  @Input() defaultQuery: any;
  @Input() defaultSort: any;

  data:any;
  groupSelected:any[] = [];
  loading:boolean = true;
  groupsIds:string[];
  groupSettingSearch:any[];
  
  dateRanges: any[];
  showSearch:boolean=false;
  //* INFO TABLE
  totalPages: number = 0; // Número de paginas
  currentPage: number = 1; // Página actual
  
  actualSort: any;
  actualQuery: any;
  
  
  public sizePage:number=10;

  constructor(
    private _router: Router
  ) { 
    this.data = [];
    this.defaultSort = {};
    this.actualSort = {};
    this.actualQuery = {};
    this.defaultQuery = {};
    let date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.dateRanges = [
      {
        value: [
          new Date(new Date().setDate(new Date().getDate() - 7)),
          new Date(),
        ],
        label: "Ultimos 7 Dias",
      },
      {
        value: [primerDia, ultimoDia],
        label: "Este mes",
      },
    ];
  }

  ngAfterContentInit(): void {
    
    this.groupsIds = this.contenido.toArray().map((e)=>e.id);
    this.groupSettingSearch = this.contenido.toArray().map((e)=>e.settingField);
    this.contenido.toArray().forEach((e)=>{
      e.actualiceSetting.subscribe((type)=> this.getData());
    });
    
  }

  ngOnInit(): void {
    //this.getData();
  }

  getData(){
    this.loading = true;
    this.dataClass.execute(this.currentPage, this.sizePage, this.actualQuery, this.actualSort).subscribe((e)=>{
      this.data = e;
      this.totalPages = this.dataClass.totalPages;
      this.loading = false;
    });
  }

  sort(column){
    //Limpiar las otras columnas
    this.contenido.toArray().forEach((element) => {
      if (element.id != column) {
        element.sort = TYPESORT.DEFAULT;
      }
    });
    // Establecer la funcionalidad a aplicar: asc, desc o none
    if (column.sort === TYPESORT.DEFAULT) column.sort = TYPESORT.ASC;
    else if (column.sort === TYPESORT.ASC) column.sort = TYPESORT.DSC;
    else if (column.sort === TYPESORT.DSC) column.sort = TYPESORT.DEFAULT;
    //Limpiar los ordenamientos de las demás columnas
    if (column.sort != TYPESORT.DEFAULT) {
      // si hay que ordenar
      let newSort = {};
      newSort[column.id] = column.sort;
      this.actualSort = newSort;
    } else {
      this.actualSort = {};
    }
    this.getData()
  }

  selectRow(row){
    if (this.isSelected(row)) {
      this.groupSelected = this.groupSelected.filter((e)=> e != row);
    }else{
      
      this.groupSelected.push(row);
    }

    this.TypeSelected = this.groupSelected.length>0? 'partial' : 'none';
  }

  isSelected(row){
    return this.groupSelected.find((e)=> e==row);
  }

  desctivateTHoptions = false;
  contains1viewInOptions(data){
    return this.settings?.options?.find((e)=>{e.showIf(data)});
  }

  toggleSearchInputs() {
    this.showSearch = !this.showSearch;
  }
  
  search(column) {
    if (column.valuesToSearch?.length === 0) return this.clearSearch(column);
    var reg = column.valuesToSearch.reduce((acum, e) => acum + e, "");
    let i = 0;
    this.actualQuery[column.id] = column.literalSearch
      ? {
          $in: column.valuesToSearch,
        }
      : {
          regex: true,
          toEvaluate: String(
            column.valuesToSearch.reduce((acum, e) => {
              i++;
              return `${acum}${i == 1 ? "" : "|"}${e}`;
            }, "")
          ),
        };
    this.getData();
  }

  clearSearch(column) {
    delete this.actualQuery[column.id];
    this.getData();
  }

  Eventsort(setting){
    console.log("ajijiji");
    //Limpiar las otras columnas
    // Establecer la funcionalidad a aplicar: asc, desc o none
    if (setting === TYPESORT.DEFAULT) setting = TYPESORT.ASC;
    else if (setting === TYPESORT.ASC) setting = TYPESORT.DSC;
    else if (setting === TYPESORT.DSC) setting = TYPESORT.DEFAULT;
    //Limpiar los ordenamientos de las demás columnas
    if (setting != TYPESORT.DEFAULT) {
      // si hay que ordenar
      let newSort = {};
    }
  }

  middlewareTransform(functionToDo, row, settings: TableColumn){
    let cadena:string = functionToDo(row);
    cadena = cadena + '';
    cadena =  cadena.replace("${G}", this._globalCurrency);
    return cadena.replace("${C}", settings.currency);
  }
  TypeSelected = 'none';


  public exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveExcelFile(excelBuffer, fileName);
  }

  fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  fileExtension = ".xlsx";
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  generateExcel() {
    let sort = {};
    Object.assign(sort, this.actualSort);
    Object.assign(sort, this.defaultSort);
    let query = {};
    Object.assign(query, this.defaultQuery);
    Object.assign(query, this.actualQuery);
        this.dataClass.execute(this.currentPage, this.sizePage, query, sort).subscribe((e)=>{
          let exportData = e;
          for (let i in exportData) {
            var elemento: any = {};
            for (let j in this.groupSettingSearch) {
              if (this.groupSettingSearch[j].export) {
                elemento[this.groupSettingSearch[j].title] =
                this.groupSettingSearch[j].type == "date"
                    ? this.formatDate(exportData[i][this.groupSettingSearch[j].id])
                    : this.groupSettingSearch[j].transform&&this.groupSettingSearch[j].preserveTransformation
                    ? this.groupSettingSearch[j].transform(exportData[i])
                    : exportData[i][this.groupSettingSearch[j].id];
              }
            }
            exportData[i] = elemento;
          }
          this.exportExcel(exportData, "data" + this.actualDate());
        });
    }

    generateExcelPartial() {
      let sort = {};
      Object.assign(sort, this.actualSort);
      Object.assign(sort, this.defaultSort);
      let query = {};
      Object.assign(query, this.defaultQuery);
      Object.assign(query, this.actualQuery);
          let exportData = this.groupSelected;
          for (let i in exportData) {
            var elemento: any = {};
            for (let j in this.groupSettingSearch) {
              if (this.groupSettingSearch[j].export) {
                elemento[this.groupSettingSearch[j].title] =
                this.groupSettingSearch[j].type == "date"
                    ? this.formatDate(exportData[i][this.groupSettingSearch[j].id])
                    : this.groupSettingSearch[j].transform&&this.groupSettingSearch[j].preserveTransformation
                    ? this.groupSettingSearch[j].transform(exportData[i])
                    : exportData[i][this.groupSettingSearch[j].id];
              }
            }
            exportData[i] = elemento;
          }
          this.exportExcel(exportData, "data" + this.actualDate());
      }

    /**
     *Formatea la fecha a un formato legible
    *
    * @param {*} dateString
    * @returns
    * @memberof DynamicTableComponent
    */
    formatDate(dateString) {
      if (!dateString) return "";
      var f = new Date(dateString);
      return `${f.getDate()}/${
        f.getMonth() + 1
      }/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
    }

    actualDate() {
      var f = new Date();
      return `${f.getDate()}-${f.getMonth()}-${f.getFullYear()}`;
    }

    searchDate($event: Date[], column) {
      if ($event && $event.length == 2) {
        let firstDayOld = $event[0]; //Obtengo la fecha inicial introducida por el usuario
        let firstDayObj = {}; //Creo el objeto para hacer el query
        firstDayObj[column.id] = {
          $gte: new Date(
            firstDayOld.getFullYear(),
            firstDayOld.getMonth(),
            firstDayOld.getDate()
          ),
        }; // Le quito el tiempo a la fecha y construyo el objeto
        let lastDayOld = $event[1]; // Obtengo la fecha final introducida por el usuario
        let lastDay = new Date(
          lastDayOld.getFullYear(),
          lastDayOld.getMonth(),
          lastDayOld.getDate()
        ); // le quito la hora
        lastDay.setDate(lastDay.getDate() + 1); // Le sumo un dia
        let lastDayObj = {}; // Crep el objeto para hacer el query
        lastDayObj[column.id] = { $lt: lastDay }; // Construyo el objeto
        this.actualQuery.$and = [firstDayObj, lastDayObj]; // contruyo la query
        this.getData(); // Obtener la informacion
      }
    }

    onPickrow(data){
      if (this.settings.onPickRow) {
        this.settings.onPickRow(data);
      }
    }

    cleanDate(column) {
      delete this.actualQuery.$and;
      this.getData();
    }

    goToLink(link){
      this._router.navigate([link]);
    }
}
