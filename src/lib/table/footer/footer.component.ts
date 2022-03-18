import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'kraken-table-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() goToPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  _prevPage(){
    if (this.currentPage == 1) return;
    this.goToPage.emit(this.currentPage - 1);
  }

  _nextPage(){
    if (this.currentPage == this.totalPages) return; 
    this.goToPage.emit(this.currentPage + 1);
  }

  _goToPage(page: number){
    this.goToPage.emit(page);
  }
}
