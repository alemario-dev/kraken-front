export interface KrakenOptionsColumns{
    icon?: string;
    showIf?: (any);
    do:(any);
    label:string;
    Class?:string;
}

export interface KrakenSettingsColumns{
    options?: KrakenOptionsColumns[];
    actionsButtons?: KrakenOptionsColumns[];
    onPickRow?: (any);
    selectRows?: boolean;
    showDownloadPartial?: (any);
}