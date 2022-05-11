import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CreateMetafieldsComponent } from '../modals/create-metafields/create-metafields.component';

@Injectable({
  providedIn: 'root'
})
export class ModalMetaFieldsService {

  constructor(private modalService: NgbModal) { }

  Open(metafields:any[]): Observable<any>{
    return new Observable((suscriber)=>{
      const modal = this.modalService.open(CreateMetafieldsComponent);
      modal.componentInstance.me = modal;
      modal.componentInstance.meta = metafields ?? [];
      modal.componentInstance.save.subscribe((e)=>{
        suscriber.next(e);
      })
    })
  }

}
