import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kraken-actions-buttons',
  templateUrl: './actions-buttons.component.html',
  styleUrls: ['./actions-buttons.component.css']
})
export class ActionsButtonsComponent implements OnInit {

  sizePage:number=10;
  
  constructor() { }

  ngOnInit(): void {
  }

}
