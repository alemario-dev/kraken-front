import { HttpClient } from "@angular/common/http";
import { KrakenDataTable } from "./schemaDataTable";

export class KrakenServiceTable extends KrakenDataTable{
    reload() {
        throw new Error("Method not implemented.");
    }
    
    service:any;
    nameService:any;
    constructor(KrakenService, nameService: string){
        super();
        this.service = KrakenService;
        this.nameService = nameService;
    }

    execute(currentPage, sizePage, query, sort) {
        return this.service[this.nameService]({page: currentPage, limit: sizePage, query, sort});
    }
    
}