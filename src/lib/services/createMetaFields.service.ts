import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CreateMetafieldsComponent } from '../modals/create-metafields/create-metafields.component';

@Injectable({
  providedIn: 'root'
})
export class ModalMetaFieldsService {

  constructor(private modalService: NgbModal) { }

  Open(): Observable<any>{
    return new Observable((suscriber)=>{
      const modal = this.modalService.open(CreateMetafieldsComponent);
      modal.componentInstance.me = this.modalService;
      modal.componentInstance.save.subscribe((e)=>{
        suscriber.next(e);
      })
    })
  }

}
