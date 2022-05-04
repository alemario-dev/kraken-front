import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { OptionToSearch, TableColumn, TYPESORT } from '../../../../interfaces/table/settings/settingColumn';

@Component({
  selector: 'kraken-colum',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit{
  
  constructor() {
  }

  @Input() title:string;
  @Input() id:string;
  @Input() show? : boolean = true;
  @Input() sort? : TYPESORT = TYPESORT.DEFAULT;
  @Input() canSort? : boolean = true;
  @Input() valuesToSearch? : [];
  @Input() literalSearch?: boolean = false;
  @Input() hideSearch?: boolean;
  @Input() optionsToSearch? : any;
  @Input() type? : string = "default";
  @Input() currency? : string;
  @Input() transform: any;
  @Input() export: boolean = true;
  @Input() baseUrl:string;

  @Input() minLength: number;

  @Output() actualiceSetting = new EventEmitter<number>();

  ngOnInit(): void {
    this.CargarOpcionesDeBusqueda();
  }

  CargarOpcionesDeBusqueda(){
    if (typeof this.optionsToSearch == "object" && !Array.isArray(this.optionsToSearch)) {
      this.optionsToSearch = Object.keys(this.optionsToSearch).filter(e=> isNaN(+e)).map((key)=>{
        return {
          label: key.replace("_"," "),
          value: this.optionsToSearch[key]
        }
      });
      this.literalSearch = true;
    }

    if (typeof this.optionsToSearch == "boolean") {
      this.optionsToSearch = [
        {
          label: 'Si',
          value: true
        },
        {
          label: 'No',
          value: false
        },
      ];
      this.literalSearch = true;
    }

  

  }

  
  public get settingField() : any {

    let salida:TableColumn = {
      id: this.id,
      show: this.show,
      sort: this.sort,
      canSort: this.canSort,
      valuesToSearch: this.valuesToSearch,
      literalSearch: this.literalSearch,
      hideSearch: this.hideSearch,
      optionsToSearch: this.optionsToSearch as OptionToSearch[],
      type: this.type,
      title: this.title,
      currency:  this.currency,
      transform: this.transform,
      export: this.export,
      baseUrl: this.baseUrl
    }

    return salida;
  }
  

}
