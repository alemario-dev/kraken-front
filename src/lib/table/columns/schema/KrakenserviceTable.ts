import { HttpClient } from "@angular/common/http";
import { KrakenDataTable } from "./schemaDataTable";

export class KrakenServiceTable extends KrakenDataTable {
  reload() {
    throw new Error("Method not implemented.");
  }

  service: any;
  nameService: any;
  defaultQuery: any = {};
  defaultSort: any = {};

  constructor(KrakenService , nameService: string, defaultQuery: any = {}, defaultSort: any = {}) {
    super();
    this.service = KrakenService;
    this.nameService = nameService;
    this.defaultQuery = defaultQuery;
    this.defaultSort = defaultSort;
  }

  execute(currentPage, sizePage, query, sort) {
    Object.assign(query, this.defaultQuery);
    
    Object.assign(query, {page:currentPage });
    Object.assign(query, {limit:sizePage });

    Object.assign(sort, this.defaultSort);
    const paramsToSend = {
        query,
        sort
    }
    console.log(paramsToSend);
    if (this.nameService) {
        return this.service[this.nameService](paramsToSend);
    }

    return this.service.getAllWithOptions(paramsToSend);
  }
}
