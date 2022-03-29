import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { KrakenDataTable } from "./schemaDataTable";

export class KrakenServiceTable extends KrakenDataTable {
  reload() {
    throw new Error("Method not implemented.");
  }

  service: any;
  nameService: any;
  defaultQuery: any = {};
  defaultSort: any = {};
  public totalPages: number;
  constructor(KrakenService , nameService: string= null, defaultQuery: any = {}, defaultSort: any = {}) {
    super();
    this.service = KrakenService;
    this.nameService = nameService;
    this.defaultQuery = defaultQuery;
    this.defaultSort = defaultSort;
  }

  execute(currentPage, sizePage, query, sort) {
    Object.assign(query, this.defaultQuery);
    Object.assign(sort, this.defaultSort);

    
    if (this.nameService) {
        if (!this.service[this.nameService]) {
            console.error("revisa el nombre del servicio");
        }
        return this.service[this.nameService](currentPage, sizePage, query, sort);
    }

    return new Observable(subscriber => {
        this.service.listWithOptions(currentPage, sizePage, query, sort).subscribe((res)=>{
            this.totalPages = res?.totalPages? res.totalPages :  NaN;
            subscriber.next(res?.elements? res.elements:res);
        });
      });
    
  }
}
