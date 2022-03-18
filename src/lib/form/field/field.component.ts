import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { INPUTTYPEFIELDS, KrakenFieldSetting, VALIDATE_FIELDS } from './settingField.component';

@Component({
  selector: 'kraken-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class KrakenFieldComponent implements OnInit {

  @ViewChild('content') content:ElementRef;

  @Input() settings: KrakenFieldSetting = new KrakenFieldSetting("x");
  @Input() value: any;
  @Input() id: string="";
  @Input() placeholder: string="";
  @Input() block: boolean = false;
  @Input() toolTip: string;
  
  messageError:string = "";
  edit = false;
  keyTrigger = false;
  TYPE_FIELDS =INPUTTYPEFIELDS;
  constructor() { }


  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  }


  validator(){
    const result = this.settings?.validators?.find((fun)=>{
      const krakenVal = fun?.function(this.value);
      if (krakenVal==VALIDATE_FIELDS.INVALID) {
        this.messageError = fun.message;
      }
      return krakenVal;
    });
    
    return (result? VALIDATE_FIELDS.INVALID : VALIDATE_FIELDS.VALID)
  }

  public get FinalValue(){
    if (!this.id) {
      console.error("Falta definir id");
    }
    return this.value;
  }

  keyFunc($event:any){
    this.keyTrigger = true;
  }

}
