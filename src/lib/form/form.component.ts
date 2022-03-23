import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { KrakenFieldComponent } from './field/field.component';
import { VALIDATE_FIELDS } from './field/settingField.component';

@Component({
  selector: 'kraken-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @ContentChildren(KrakenFieldComponent) FieldsView: QueryList<KrakenFieldComponent> | undefined;
  @Input() readonly: boolean = false;
  @Input() onSubmit: any;
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    //* Todos los campos los bloquea
    this.FieldsView?.toArray().forEach(element => {
      element.edit = this.readonly;
    });
  }

  public get getData(){
    let objectToSend = {} as any;
    if (this.ValidateForm() == VALIDATE_FIELDS.INVALID) {
      return null;
    }

    this.FieldsView?.toArray().forEach(element => {
      objectToSend[element.id] = element.FinalValue;
    });
    return objectToSend;
  }

  private ValidateForm(){
    const objectTrue  = this.FieldsView?.toArray().map(element => {
      if (element.validator() == VALIDATE_FIELDS.INVALID) {
        element.keyTrigger = true;
        console.log(element.id);
      }
      return element.validator();
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
