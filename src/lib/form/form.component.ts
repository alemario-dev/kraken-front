import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { KrakenFieldComponent } from './field/field.component';
import { VALIDATE_FIELDS } from './field/settingField.component';

@Component({
  selector: 'kraken-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @ContentChildren(KrakenFieldComponent, { descendants: true }) FieldsView: QueryList<KrakenFieldComponent> | undefined;
  @Input() readonly: boolean = false;
  @Input() onSubmit: any;
  @Input() loading: boolean = false;
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

  middleOnSumbit(){
    const data = this.getData;
    if (!data) { return }
    this.onSubmit(data);
  }

  ngAfterContentInit(): void {
    //* Todos los campos los bloquea
    this.FieldsView?.toArray().forEach(element => {
      element.edit = this.readonly;
    });
  }

  public get getData(){
    let objectToSend = {} as any;
    //validar formulario
    console.log(this.ValidateForm());
    if (this.ValidateForm() == VALIDATE_FIELDS.INVALID) {
      return null;
    }

    //proceso de crear el objecto de salida
    this.FieldsView?.toArray().map(element => {
      const ids = element.id.split('.');
      
      let RecusiveObject = objectToSend;
      ids.map((id, index)=>{
        if (index != ids.length-1) {
          RecusiveObject[id] = RecusiveObject[id]?RecusiveObject[id]:{} as any;
          RecusiveObject = RecusiveObject[id];
        }else{
          RecusiveObject[ids.pop()] = element.FinalValue;
        }
      })
      
    });
    return objectToSend;
  }

  private ValidateForm(){
    //validadores individuales
    const objectTrue  = this.FieldsView?.toArray().map(element => {
      let resultado = element.validator();
      // const resultDifMatch = this.FieldsView.toArray().filter(e=>(e.mustMatch == element.mustMatch)&&element.mustMatch).find((e)=>e.value != element.value);
      // resultado = resultDifMatch? VALIDATE_FIELDS.INVALID : resultado
      if (resultado == VALIDATE_FIELDS.INVALID) {
        element.keyTrigger = true;
      }

      return resultado;
    });

    return objectTrue.some((e)=>e==VALIDATE_FIELDS.INVALID)? VALIDATE_FIELDS.INVALID: VALIDATE_FIELDS.VALID;
  }

  public ValidateGroup(GroupIds:string[]): VALIDATE_FIELDS{

    const somethingTrue = GroupIds.find((id)=>{

      const component = this.FieldsView?.toArray().find((element)=> element.id == id);

      if (!component) { console.error("No se reconoce el kraken field con el id: " + id); throw "Error";}

      const somethingTrue = component?.validator();

      return somethingTrue;
    });

    return somethingTrue? VALIDATE_FIELDS.INVALID : VALIDATE_FIELDS.VALID ;
  };

}
