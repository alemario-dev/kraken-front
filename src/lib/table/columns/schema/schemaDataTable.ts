import { Observable } from "rxjs";

export  abstract class KrakenDataTable{
    abstract execute(currentPage, sizePage, query, sort): Observable<any>;
    abstract reload(): any;
}