import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kraken-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @Input() clickOnCreate: (any);
  ngOnInit(): void {
  }

  clickCreate(){
    this.clickOnCreate();
  }

}
