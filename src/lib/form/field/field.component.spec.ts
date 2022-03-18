import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrakenFieldComponent } from './field.component';

describe('KrakenFieldComponent', () => {
  let component: KrakenFieldComponent;
  let fixture: ComponentFixture<KrakenFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KrakenFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KrakenFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
