export class KrakenFieldSetting {
    toolTip?: string;
    validators?: IkrakenValidator[];
    label: string;
    type?:  INPUTTYPEFIELDS;
    required?:  boolean;
    icon?:  "";
    
    //propiedades para ng-select
    values?:any;
    bindLabel?:string;
    constructor(label:any, required=false,  toolTip="",type = INPUTTYPEFIELDS.TEXT){
        this.label = label;
        this.type = type;
        this.toolTip = toolTip;
        this.required = required;
    }

    set setting(setting: KrakenFieldSetting){
        Object.assign(this, setting);
    }
}

export interface IkrakenValidator{
    function: (any);
    message: string;
}

export enum INPUTTYPEFIELDS {
    TEXT = 'text',
    DATE = 'date',
    CHECKBOX = 'checkbox',
    TEXTAREA = 'TEXTAREA',
    SELECT_CLOSE = 'SELECT_CLOSE',
    SELECT_OPEN = 'SELECT_OPEN',
    PASSWORD = 'password',
    NUMBER = 'number'
}

export enum VALIDATE_FIELDS {
    VALID = 0,
    INVALID =  1
}