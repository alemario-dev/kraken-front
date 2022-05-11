import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { INPUTTYPEFIELDS } from '../../interfaces/form/settingField.component';
import { MetaField } from '../../interfaces/metadata/metafields';

@Component({
  selector: 'kraken-create-metafields',
  templateUrl: './create-metafields.component.html',
  styleUrls: ['./create-metafields.component.css']
})
export class CreateMetafieldsComponent implements OnInit {
  error: string;
  loading = false;
  @Input() father: any;
  @Input() me: any;
  type: string;
  @Input() meta: MetaField[] = [];
  fieldSelected : MetaField;
  inputTypes$;
  isNewField = true;
  @Output() save = new EventEmitter<MetaField[]>();

  constructor() {
  }

  ngOnInit(): void {
    this.fieldSelected = new MetaField();
    this.inputTypes$ = Object.keys(INPUTTYPEFIELDS).filter(e=> isNaN(+e)).map((key)=>{
      return {
        label: key.replace("_"," "),
        value: INPUTTYPEFIELDS[key]
      }
    });
  }

  saveMeta(){
    this.save.emit(this.meta);
    this.dismiss();
  }

  dismiss() {
    this.me.dismiss();
  }

  setAsUpdateField(field){
    this.fieldSelected = field;
    this.isNewField = false;
  }

  addField(isnew: Boolean){
    if(!this.fieldSelected.id||!this.fieldSelected.label||!this.fieldSelected.type){
      this.error = "Porfavor llene todos los campos"
      return
    }
    this.error = null;
    if(isnew){
      var re = / ?-?/g;
      this.fieldSelected.id=this.fieldSelected.id.trim().replace(re,"").toLowerCase();
      
      this.meta.push(this.fieldSelected);
    }
    else{
      this.isNewField = true;
    }
    this.fieldSelected = new MetaField();
  }

  cancelSave(){
    this.isNewField = true;
    this.fieldSelected = new MetaField();
  }

  removeItemMeta(itemToRemove){
    this.meta = this.meta.filter(e=>e!==itemToRemove);
  }

}
