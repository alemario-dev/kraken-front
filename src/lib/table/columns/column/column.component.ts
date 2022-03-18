import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { OptionToSearch, TableColumn, TYPESORT } from './settingColumn';

@Component({
  selector: '[kc]',
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
  @Input() literalSearch?: boolean;
  @Input() hideSearch?: boolean;
  @Input() optionsToSearch? : OptionToSearch[];
  @Input() type? : string = "default";
  @Input() currency? : string;
  @Input() transform: any;
  @Input() export: boolean = true;
  @Output() actualiceSetting = new EventEmitter<number>();

  ngOnInit(): void {
    
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
      optionsToSearch: this.optionsToSearch,
      type: this.type,
      title: this.title,
      currency:  this.currency,
      transform: this.transform,
      export: this.export
    }

    return salida;
  }
  

}
