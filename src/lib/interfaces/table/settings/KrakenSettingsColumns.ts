export interface KrakenOptionsColumns<U>{
    icon?: string;
    showIf?: (any);
    do:(row:U)=> void;
    label:string;
    Class?:string;
}

export interface KrakenSettingsColumns<U>{
    options?: KrakenOptionsColumns<U>[];
    actionsButtons?: KrakenOptionsColumns<U>[];
    onPickRow?: (row:U)=> void;
    selectRows?: boolean;
    showDownloadPartial?: (any);
}