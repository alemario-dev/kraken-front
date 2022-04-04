import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IkrakenValidator, INPUTTYPEFIELDS, minLengthValidator, VALIDATE_FIELDS, ValidatorEmail } from './settingField.component';

@Component({
  selector: 'kraken-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class KrakenFieldComponent implements OnInit, AfterContentInit{

  @ViewChild('content') content:ElementRef;
  @Input() value: any;
  @Input() id: string="";
  @Input() placeholder: string="";
  @Input() block: boolean = false;
  @Input() toolTip: string;
  @Input() validators?: IkrakenValidator[];
  @Input() label: string;
  @Input() type?:  INPUTTYPEFIELDS;
  @Input() required?:  boolean;
  @Input() icon?:  string;
  @Input() values?:any;
  @Input() bindLabel?:string;
  @Input() bindValue?:string;

  //infoValidadores
  @Input() minLength?: number;
  @Input() mustMatch?: string
  messageError:string = "";
  edit = false;

  
  keyTrigger = false;
  TYPE_FIELDS =INPUTTYPEFIELDS;

  constructor(
  ) { }

  ngAfterContentInit(): void {
    this.cargarValidadores();
  }


  ngOnInit(): void {
    
  }


  validator(){
    let result;
    result = this.validators?.find((fun)=>{
      const krakenVal = fun?.function(this.value, this);
      if (krakenVal==VALIDATE_FIELDS.INVALID) {
        this.messageError = fun.message;
      }
      return krakenVal;
    });
    result = !this.value&&this.required&&!this.block? VALIDATE_FIELDS.INVALID: result

    if (result === VALIDATE_FIELDS.INVALID) {
      this.messageError = "El campo es obligatorio" ;
    }

    return (result? VALIDATE_FIELDS.INVALID : VALIDATE_FIELDS.VALID)
  }

  public get FinalValue(){
    if (!this.id) {
      console.error("Falta definir id "  + this.placeholder);
    }
    return this.value;
  }

  keyFunc($event:any){
    this.keyTrigger = true;
  }

  cargarValidadores(){
    this.validators = this.validators?this.validators:[];
    if (this.type === this.TYPE_FIELDS.EMAIL) {
      this.validators.push(ValidatorEmail);
    }
    if (this.minLength) {
      this.validators.push(minLengthValidator);
    }
  }

}
