import { INPUTTYPEFIELDS } from "../form/settingField.component";


export class MetaField {
  type: INPUTTYPEFIELDS; // tipo de input
  label: string;
  id: string;
  protected? : boolean;
  required: boolean;
  error?: string;
  value?: any;
  values?: any[];
  constructor(){
    this.type = null;
    this.label = '';
    this.id = '';
    this.protected = false;
    this.required = false;
  }
}