import { Observable } from "rxjs";
import { KrakenDataTable } from "./schemaDataTable";

export class KrakenArrayTable extends KrakenDataTable{
    reload() {
        throw new Error("Method not implemented.");
    }
    array:[];
    constructor(array){
        super();
        this.array = array;
    }

    execute(currentPage, sizePage, query, sort) {
        return new Observable(subscriber => {
            console.log('Hello');
            subscriber.next(this.array.slice((currentPage-1)*sizePage, currentPage*sizePage));
          });
        
    }
    
}