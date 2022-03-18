export interface OptionToSearch{
    label: string;
    value: any;
  }
  
  export enum TYPESORT {
    ASC = 1,
    DSC = -1,
    DEFAULT = 0
  }

export class TableColumn {
  title: string;
  id: string;
  type?: string;
  show? : boolean;
  sort? : TYPESORT;
  canSort? : boolean;
  valuesToSearch? : [];
  literalSearch?: boolean;
  hideSearch?: boolean;
  optionsToSearch? : OptionToSearch[];
  transform?: FunctionOnRow;
  export?: boolean = true;
  currency: string;
  /**
   * Preserva la transformacion hecha para la tabla en la exportacion
   */
  preserveTransformation?: boolean = false;
}

export interface FunctionOnRow {
  (row): any;
}