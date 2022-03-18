import { TableColumn } from "./columns/column/settingColumn";

export class TableSettings {
  title: string;
  baseUrl: string;
  defaultActions?: defaultActionSettings;
  showCreate?: boolean; // Muestra o no el boton de crear [ boton con un signo +]
  onCreate?: Function; // Accion que se ejecutara presionar el boton de crear
  sizePage?: number;
  columns?: TableColumn[]; 
  actions?: TableAction[];
  actionButtons?: TableAction[]; 
  actionsHeader?: TableAction[]; // Botones con acciones que puede realizar en el header
  onPickRow?: OnPickObject;
  query?: any;
  download?: boolean;
  sort?: any;
  scopeCreate?: string; 
  scopeSee?: string; 
  scopeDelete?: string; 
  scopeUpdate?: string; 
  rowTooltip?: string;

  constructor() {
    this.title = "";
    this.baseUrl = "";
    this.rowTooltip = "";
    this.defaultActions = {
      see: true,
      delete: true,
      update: true
    };
    (this.sizePage = 10), (this.columns = []), (this.actions = []);
    this.query = {};
    this.sort = {};
  }
}

export interface OptionToSearch{
  label: string;
  value: any;
}

export enum TYPESORT {
  ASC = 1,
  DSC = -1,
  DEFAULT = 0
}

export class TableAction {
  icon?: string; //icono que se mostrara
  title: string; //title que se muestra cuando el mouse esta sobre el
  scope?: string; 
  class?: string;
  do: FunctionAction; //funcion que hara cuando se da click ej: router.navergate()
  showFunction?: FunctionOnRow;
}

export interface FunctionAction {
  (row, table): any;
}

export class OnPickObject{
    do: FunctionOnRow;
}

export interface FunctionOnRow {
(row): any;
}

export class defaultActionSettings {
  see: boolean;
  update: boolean;
  delete: boolean;
}